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

    back(): void {
        this.router.navigate(['/characters']);
    }
}
