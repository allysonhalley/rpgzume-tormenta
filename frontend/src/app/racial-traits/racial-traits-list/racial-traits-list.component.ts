import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { RacialTraits } from "../../core/models/models";
import { RacialTraitsService } from "../../core/services/racial-traits.service";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-racial-traits-list',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
    templateUrl: './racial-traits-list.component.html',
    styleUrls: ['../../shared/shared-list.component.scss']
})
export class RacialTraitsListComponent implements OnInit {
    racialTraits: RacialTraits[] = [];

    constructor(private racialTraitsService: RacialTraitsService) { }

    ngOnInit(): void {
        this.racialTraitsService.getAllRacialTraits().subscribe({
            next: (data) => {
                this.racialTraits = data;
            },
            error: (error) => {
                console.error('Erro ao buscar raças:', error);
            }
        });
    }

    getTraitsList(traits: string): string[] {
        if (!traits) return [];
        // Assuming traits are separated by semicolons or newlines, or just return as is if unstructured.
        // The prompt says "traits: será uma lista das habilidades".
        // Let's assume the DB stores it as a raw string and we might want to split it if it looks like a list.
        // For now, let's just split by newlines or specific delimiters if present.
        // But given the "AI Import" prompt will likely return a string block, let's treat it as a block or simple split.
        return traits.split(/[\n;]/).filter(t => t.trim().length > 0);
    }
}
