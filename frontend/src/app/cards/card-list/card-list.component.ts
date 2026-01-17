import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CardService } from '../../core/services/card.service';
import { Card, Magic, Feature } from '../../core/models/models';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardFooter
} from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatDivider, MatCardFooter, MatIconModule, MatButtonModule],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  featuresList: Feature[] = [];
  magicsList: Magic[] = [];

  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit() {
    this.cardService.getAllCards().then(response => {
      console.log('Cards Response:', response.data);
      this.magicsList = response.data.magic || [];
      this.featuresList = response.data.feature || [];
    }).catch(error => {
    }).catch(error => {
      console.error('Error loading cards:', error);
    });
  }

  addCard() {
    this.router.navigate(['/cards/new']);
  }

  editCard(id: string | undefined) {
    if (id) {
      this.router.navigate(['/cards/edit', id]);
    }
  }
}
