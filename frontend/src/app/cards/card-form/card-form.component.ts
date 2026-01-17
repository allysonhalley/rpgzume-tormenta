import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { CardService } from '../../core/services/card.service';
import { Card } from '../../core/models/models';

@Component({
    selector: 'app-card-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatSelectModule
    ],
    templateUrl: './card-form.component.html',
    styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
    card: Card = {
        // id is undefined for new cards
        type: '',
        name: '',
        resume: '',
        description: '',
        book: '',
        page: 0
    };

    isEditMode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cardService: CardService
    ) { }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            try {
                const response = await this.cardService.getCardById(id);
                this.card = response.data;
            } catch (error) {
                console.error('Error loading card', error);
            }
        }
    }

    async save() {
        try {
            if (this.isEditMode && this.card.id) {
                await this.cardService.updateCard(this.card.id!, this.card as Card);
            } else {
                await this.cardService.createCard(this.card);
            }
            this.router.navigate(['/cards']);
        } catch (error) {
            console.error('Error saving card', error);
        }
    }

    async deleteCard() {
        if (this.card.id) {
            try {
                await this.cardService.deleteCard(this.card.id!);
                this.router.navigate(['/cards']);
            } catch (error) {
                console.error('Error deleting card', error);
            }
        }
    }

    cancel() {
        this.router.navigate(['/cards']);
    }
}
