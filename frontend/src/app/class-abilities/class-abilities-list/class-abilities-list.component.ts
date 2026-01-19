import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ClassAbilities } from "../../core/models/models";
import { ClassAbilitiesService } from "../../core/services/class-abilities.service";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-class-abilities-list',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTabsModule],
    templateUrl: './class-abilities-list.component.html',
    styleUrls: ['../../shared/shared-list.component.scss']
})
export class ClassAbilitiesListComponent implements OnInit {
    classAbilities: ClassAbilities[] = [];
    groupedAbilities: { [className: string]: ClassAbilities[] } = {};
    classNames: string[] = [];

    constructor(private classAbilitiesService: ClassAbilitiesService) { }

    ngOnInit(): void {
        this.classAbilitiesService.getAllClassAbilities().subscribe({
            next: (data) => {
                this.classAbilities = data;
                this.groupAbilities();
            },
            error: (error) => {
                console.error('Erro ao buscar Habilidades de Classe:', error);
            }
        });
    }

    groupAbilities(): void {
        this.groupedAbilities = this.classAbilities.reduce((acc, current) => {
            // card.name now holds the Class Name (e.g. Bárbaro)
            const className = current.name || 'Outros';
            if (!acc[className]) {
                acc[className] = [];
            }
            acc[className].push(current);
            return acc;
        }, {} as { [key: string]: ClassAbilities[] });

        this.classNames = Object.keys(this.groupedAbilities).sort();
    }

    getAbilitiesList(abilities: string): string[] {
        if (!abilities) return [];
        return abilities.split(/[\n;]/).filter(t => t.trim().length > 0);
    }
}
