import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ClassAbility } from "../../core/models/models";
import { ClassAbilityService } from "../../core/services/class-ability.service";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-class-abilities-list',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTabsModule],
    templateUrl: './class-abilities-list.component.html',
    styleUrls: ['../../shared/shared-list.component.scss', './class-abilities-list.component.scss']
})
export class ClassAbilitiesListComponent implements OnInit {
    classAbilities: ClassAbility[] = [];
    groupedAbilities: { [className: string]: ClassAbility[] } = {};
    classNames: string[] = [];

    constructor(private classAbilityService: ClassAbilityService) { }

    ngOnInit(): void {
        this.classAbilityService.getAllClassAbilities().subscribe({
            next: (data: ClassAbility[]) => {
                this.classAbilities = data;
                this.groupAbilities();
            },
            error: (error: any) => {
                console.error('Erro ao buscar Habilidades de Classe:', error);
            }
        });
    }

    groupAbilities(): void {
        this.groupedAbilities = this.classAbilities.reduce((acc, current) => {
            // Use playerClassName provided by DTO, fallback to 'Outros'
            const className = current.playerClassName || 'Outros';
            if (!acc[className]) {
                acc[className] = [];
            }
            acc[className].push(current);
            return acc;
        }, {} as { [key: string]: ClassAbility[] });

        this.classNames = Object.keys(this.groupedAbilities).sort();
    }

    formatTextToList(text: string | null | undefined): string[] {
        if (!text) return [];
        // Handle escaped newlines \\n which might come from DB as literal string
        let formatted = text.replace(/\\n/g, '\n');
        // Handle \r\n as \n
        formatted = formatted.replace(/\r\n/g, '\n');

        // Split by semicolon or newline
        return formatted.split(/[;\n]+/)
            .map(t => t.trim().replace(/^[-*]\s*/, '')) // Remove existing bullet markers
            .filter(t => t.length > 0);
    }
    parseAbilityLine(line: string): { label: string | null, text: string } {
        // Match patterns like "Bold Text: description" or "Bold Text. description"
        // Adjust regex to capture the label part before the first separator
        const match = line.match(/^([^:]+)(:)(.*)/);

        if (match) {
            return {
                label: match[1].trim(),
                text: match[3].trim()
            };
        }
        return { label: null, text: line };
    }

    parseBold(text: string): string {
        if (!text) return '';
        // Replace *word* with <strong>word</strong>
        return text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    }
}
