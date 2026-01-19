
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../../core/models/models';

import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-character-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterModule],
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
    characters: Character[] = [];
    userId: number | null = null;

    constructor(
        private characterService: CharacterService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId();
        if (this.userId) {
            this.loadCharacters();
        } else {
            console.error('User not authenticated or ID missing');
        }
    }

    loadCharacters(): void {
        if (!this.userId) return;
        this.characterService.getCharactersByUser(this.userId).subscribe({
            next: (data) => this.characters = data,
            error: (err) => console.error('Error loading characters', err)
        });
    }

    deleteCharacter(id: string): void {
        if (confirm('Tem certeza que deseja excluir este personagem?')) {
            this.characterService.deleteCharacter(id).subscribe({
                next: () => this.loadCharacters(),
                error: (err) => console.error('Error deleting character', err)
            });
        }
    }
}
