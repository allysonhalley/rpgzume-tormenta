import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { CharacterService } from '../character.service';
import { Character, Feature, Magic, RacialTraits, ClassAbility, PlayerClass } from '../../core/models/models';
import { FeatureService } from '../../core/services/feature.service';
import { MagicService } from '../../core/services/magic.service';
import { RacialTraitsService } from '../../core/services/racial-traits.service';
import { ClassAbilityService } from '../../core/services/class-ability.service';
import { PlayerClassService } from '../../core/services/player-class.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-character-show',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatToolbarModule,
        MatTabsModule
    ],
    templateUrl: './character-show.component.html',
    styleUrls: ['./character-show.component.scss']
})
export class CharacterShowComponent implements OnInit {
    character: Character | null = null;
    race: RacialTraits | null = null;
    raceTraitsList: string[] = [];
    features: Feature[] = [];
    featuresByType: { [key: string]: Feature[] } = {};
    featureTypes: string[] = [];
    magics: Magic[] = [];
    groupedMagics: { type: string, levels: { level: string, magics: Magic[] }[] }[] = [];
    classAbilities: ClassAbility[] = [];
    classAbilitiesByClass: { [key: string]: ClassAbility[] } = {};
    classes: { id: string, name: string }[] = [];

    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private characterService: CharacterService,
        private featureService: FeatureService,
        private magicService: MagicService,
        private racialTraitsService: RacialTraitsService,
        private classAbilityService: ClassAbilityService,
        private playerClassService: PlayerClassService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadCharacter(id);
        } else {
            this.router.navigate(['/characters']);
        }
    }

    loadCharacter(id: string): void {
        this.characterService.getCharacterById(id).subscribe({
            next: (char) => {
                this.character = char;
                this.loadDetails(char);
            },
            error: (err) => {
                console.error('Error loading character', err);
                this.loading = false;
            }
        });
    }

    loadDetails(character: Character): void {
        const promises: Promise<any>[] = [];

        // Load Race Details
        if (character.raceId) {
            promises.push(new Promise((resolve) => {
                this.racialTraitsService.getAllRacialTraits().subscribe({
                    next: (races: RacialTraits[]) => {
                        this.race = races.find(r => r.id === character.raceId) || null;
                        if (this.race) {
                            this.raceTraitsList = this.formatTextToList(this.race.traits);
                        }
                        resolve(true);
                    },
                    error: () => resolve(false)
                });
            }));
        }

        // Load Features
        promises.push(this.featureService.getAllFeatures().then((response: any) => {
            const allFeatures: Feature[] = response.data;
            this.features = allFeatures.filter(f => character.featureIds.includes(f.id!));
            this.groupFeaturesByType();
        }));

        // Load Magics
        promises.push(this.magicService.getAllMagics().then((response: any) => {
            const allMagics: Magic[] = response.data;
            this.magics = allMagics.filter(m => character.magicIds.includes(m.id!));
            this.groupMagics();
        }));

        // Load Classes and Abilities
        // We need to load all player classes to get names for additional classes
        promises.push(new Promise((resolve) => {
            this.playerClassService.getAllPlayerClasses().subscribe({
                next: (allClasses: PlayerClass[]) => {
                    this.organizeClasses(character, allClasses);

                    // Now load abilities
                    this.classAbilityService.getAllClassAbilities().subscribe({
                        next: (abilities: ClassAbility[]) => {
                            this.classAbilities = abilities;
                            this.organizeClassAbilities(abilities);
                            resolve(true);
                        },
                        error: () => resolve(false)
                    });
                },
                error: () => resolve(false)
            });
        }));

        Promise.all(promises).finally(() => {
            this.loading = false;
        });
    }

    formatTextToList(text: string | null | undefined): string[] {
        if (!text) return [];
        // Handle escaped newlines \\n which might come from DB as literal string
        let formatted = text.replace(/\\n/g, '\n');
        // Handle \r\n as \n
        formatted = formatted.replace(/\r\n/g, '\n');

        // Split by semicolon or newline
        // Remove empty strings
        return formatted.split(/[;\n]+/)
            .map(t => t.trim().replace(/^[-*]\s*/, '')) // Remove existing bullet markers
            .filter(t => t.length > 0);
    }

    parseAbilityLine(line: string): { label: string | null, text: string } {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex > -1) {
            return {
                label: line.substring(0, separatorIndex).trim(),
                text: line.substring(separatorIndex + 1).trim()
            };
        }
        return { label: null, text: line };
    }

    groupFeaturesByType(): void {
        this.featuresByType = {};
        this.features.forEach(feature => {
            const type = feature.featureType || 'Geral';
            if (!this.featuresByType[type]) {
                this.featuresByType[type] = [];
            }
            this.featuresByType[type].push(feature);
        });
        this.featureTypes = Object.keys(this.featuresByType).sort();
    }

    organizeClasses(character: Character, allClasses: PlayerClass[]): void {
        this.classes = [];

        // Principal Class
        if (character.principalClassId) {
            const pClass = allClasses.find(c => c.id === character.principalClassId);
            this.classes.push({
                id: character.principalClassId,
                name: pClass ? pClass.name : (character.principalClassName || 'Classe Principal')
            });
        }

        // Additional Classes
        if (character.additionalClassIds) {
            character.additionalClassIds.forEach(id => {
                const aClass = allClasses.find(c => c.id === id);
                if (aClass) {
                    this.classes.push({ id: aClass.id!, name: aClass.name });
                }
            });
        }
    }

    organizeClassAbilities(allAbilities: ClassAbility[]): void {
        this.classAbilitiesByClass = {};

        this.classes.forEach(cls => {
            this.classAbilitiesByClass[cls.id] = allAbilities.filter(a => {
                // First try to match by playerClassId if available
                if (a.playerClassId) {
                    return a.playerClassId === cls.id;
                }
                // Fallback to name matching if ID is missing (should not happen with updated backend)
                return a.playerClassName === cls.name || a.name === cls.name;
            });
        });
    }

    groupMagics(): void {
        // 1. Group by Type
        const typeGroups: { [type: string]: Magic[] } = {};

        this.magics.forEach(magic => {
            let type = magic.magicType || 'Outros';
            if (!typeGroups[type]) {
                typeGroups[type] = [];
            }
            typeGroups[type].push(magic);
        });

        // 2. For each Type, Group by Level
        this.groupedMagics = Object.keys(typeGroups).sort().map(type => {
            const magicsByType = typeGroups[type];
            const levelGroups: { [level: string]: Magic[] } = {};

            magicsByType.forEach(magic => {
                const level = magic.level || '0'; // Default to 0 if undefined
                if (!levelGroups[level]) {
                    levelGroups[level] = [];
                }
                levelGroups[level].push(magic);
            });

            // Sort levels numerically
            const sortedLevels = Object.keys(levelGroups).sort((a, b) => {
                const numA = parseInt(a, 10);
                const numB = parseInt(b, 10);
                if (isNaN(numA)) return 1; // Put non-numbers at end
                if (isNaN(numB)) return -1;
                return numA - numB;
            }).map(level => ({
                level,
                magics: levelGroups[level]
            }));

            return {
                type,
                levels: sortedLevels
            };
        });
    }

    generatePDF(): void {
        const doc = new jsPDF();
        let y = 20;
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 14;
        const contentWidth = pageWidth - (margin * 2);

        // Indentation levels
        const indentItem = margin + 5;
        const indentDesc = margin + 10;
        const indentSubItem = margin + 15;

        if (!this.character) return;

        // --- Helper Functions ---
        const checkPageBreak = (height: number) => {
            if (y + height > pageHeight - margin) {
                doc.addPage();
                y = 20;
            }
        };

        const drawSectionHeader = (title: string) => {
            checkPageBreak(15);
            y += 5;
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, y);
            y += 2;
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
        };

        const drawItemTitle = (title: string) => {
            checkPageBreak(10);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(title, indentItem, y);
            y += 6;
        };

        const drawDescription = (text: string, indent: number = indentDesc, isItalic: boolean = false) => {
            if (!text) return;
            doc.setFontSize(10);
            doc.setFont('helvetica', isItalic ? 'italic' : 'normal');
            const cleanText = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' '); // Basic HTML cleanup

            const availableWidth = pageWidth - indent - margin;
            const splitText = doc.splitTextToSize(cleanText, availableWidth);

            checkPageBreak(splitText.length * 5);
            doc.text(cleanText, indent, y, { maxWidth: availableWidth, align: 'justify' });
            y += (splitText.length * 5) + 2;
        };

        // --- DOCUMENT START ---

        // HEADER
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(this.character.name, margin, y);
        y += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.character.raceName || ''} - ${this.character.principalClassName || ''}`, margin, y);
        y += 10;
        doc.setLineWidth(1);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;

        // SECTION: RAÇA
        drawSectionHeader(`Raça: ${this.race?.name || this.character.raceName}`);

        if (this.raceTraitsList.length > 0) {
            this.raceTraitsList.forEach(trait => {
                const bullet = '•';
                doc.setFont('helvetica', 'bold');
                doc.text(bullet, indentItem, y);
                // Indent text after bullet
                doc.setFont('helvetica', 'normal');
                // Calculate width for text to avoid bullet overlap
                const textWidth = pageWidth - indentDesc - margin;
                const splitText = doc.splitTextToSize(trait, textWidth);

                checkPageBreak(splitText.length * 5);
                doc.text(trait, indentDesc, y, { maxWidth: textWidth, align: 'justify' });
                y += (splitText.length * 5) + 3;
            });
        }
        y += 5;

        // SECTION: CLASSES
        this.classes.forEach(cls => {
            drawSectionHeader(`Classe: ${cls.name}`);

            const abilities = this.classAbilitiesByClass[cls.id || ''] || [];
            if (abilities.length === 0) {
                drawDescription('Nenhuma habilidade encontrada.', indentItem, true);
            } else {
                abilities.forEach(ability => {
                    drawItemTitle(ability.name);

                    // 1. Description
                    if (ability.description) {
                        // Check if ability description should be list-formatted (like Bard Song)
                        const listParts = this.formatTextToList(ability.description);
                        if (listParts.length > 1) {
                            listParts.forEach(part => {
                                const parsed = this.parseAbilityLine(part);
                                if (parsed.label) {
                                    // Bold Label: Description
                                    const labelText = `${parsed.label}:`;

                                    checkPageBreak(10);
                                    doc.setFont('helvetica', 'bold');
                                    doc.setFontSize(10);
                                    doc.text(labelText, indentDesc, y);

                                    const labelWidth = doc.getTextWidth(labelText);
                                    const contentIndent = indentDesc + labelWidth + 2;
                                    const remainingWidth = pageWidth - contentIndent - margin;

                                    const splitDesc = doc.splitTextToSize(parsed.text, remainingWidth);
                                    doc.setFont('helvetica', 'normal');
                                    doc.text(parsed.text, contentIndent, y, { maxWidth: remainingWidth, align: 'justify' });
                                    y += (splitDesc.length * 5) + 3;

                                } else {
                                    drawDescription(part, indentDesc);
                                }
                            });
                        } else {
                            drawDescription(ability.description, indentDesc);
                        }
                    }

                    // 2. Sub-Abilities List (if any exists strictly as list)
                    if (ability.abilities) {
                        const abs = this.formatTextToList(ability.abilities);
                        abs.forEach(ab => {
                            doc.setFontSize(10); // Reset size
                            doc.text('-', indentDesc, y);
                            const splitAb = doc.splitTextToSize(ab, pageWidth - indentSubItem - margin);
                            checkPageBreak(splitAb.length * 5);
                            doc.text(splitAb, indentSubItem, y);
                            y += (splitAb.length * 5) + 2;
                        });
                    }
                    y += 4; // Space between abilities
                });
            }
        });

        // SECTION: TALENTOS
        drawSectionHeader('Talentos');

        if (this.features.length === 0) {
            drawDescription('Nenhum talento selecionado.', indentItem, true);
        } else {
            this.features.forEach(feat => {
                drawItemTitle(`${feat.name} (${feat.featureType || 'Geral'})`);

                const drawField = (label: string, value: string) => {
                    if (!value) return;
                    const labelText = `${label}: `;

                    checkPageBreak(10);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.text(labelText, indentDesc, y);

                    const labelWidth = doc.getTextWidth(labelText);
                    // If label + text fits, inline it. If long text, maybe wrap.
                    // Simple implementation: Text starts after label
                    const contentIndent = indentDesc + labelWidth + 1;
                    const maxWidth = pageWidth - contentIndent - margin;

                    const splitVal = doc.splitTextToSize(value, maxWidth);
                    doc.setFont('helvetica', 'normal');
                    doc.text(value, contentIndent, y, { maxWidth: maxWidth, align: 'justify' });
                    y += (splitVal.length * 5) + 2;
                };

                drawField('Descrição', feat.description);
                drawField('Benefício', feat.benefit);
                drawField('Pré-requisitos', feat.prerequisites);

                y += 4;
            });
        }

        // SECTION: MAGIAS
        if (this.magics.length > 0) {
            drawSectionHeader('Magias');

            this.groupedMagics.forEach(group => {
                checkPageBreak(10);
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bolditalic');
                doc.text(group.type, indentItem, y);
                y += 6;

                group.levels.forEach((levelGroup: any) => {
                    checkPageBreak(10);
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(80); // gray
                    doc.text(`Nível ${levelGroup.level}`, indentItem, y);
                    doc.setTextColor(0);
                    y += 6;

                    levelGroup.magics.forEach((magic: any) => {
                        checkPageBreak(15);
                        doc.setFontSize(11);
                        doc.setFont('helvetica', 'bold');
                        // Bullet for magic?
                        doc.text(`• ${magic.name}`, indentDesc, y);
                        y += 5;

                        // Short description indented further
                        const desc = magic.description || magic.resume || '';
                        if (desc) {
                            drawDescription(desc, indentSubItem);
                        }
                        y += 3;
                    });
                    y += 3;
                });
                y += 4;
            });
        }

        doc.save(`${this.character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
    }

    back(): void {
        this.router.navigate(['/characters']);
    }
}
