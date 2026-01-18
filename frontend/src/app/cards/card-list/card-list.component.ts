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

  groupedFeatures: { type: string, features: Feature[] }[] = [];

  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit() {
    this.cardService.getAllCards().then(response => {
      console.log('Cards Response:', response.data);
      this.magicsList = response.data.magic || [];
      this.featuresList = response.data.feature || [];
      this.groupFeaturesByType(this.featuresList);
    }).catch(error => {
      console.error('Error loading cards:', error);
    });
  }

  private groupFeaturesByType(features: Feature[]) {
    const desiredOrder = [
      'Talentos de Combate',
      'Talentos de Perícia',
      'Talentos de Magia',
      'Talentos de Destino',
      'Poderes Concedidos',
      'Talentos da Tormenta'
    ];

    const groups: { [key: string]: Feature[] } = {};

    features.forEach(feature => {
      const type = feature.featureType || 'Outros';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(feature);
    });

    this.groupedFeatures = [];

    // Add ordered groups first
    desiredOrder.forEach(type => {
      if (groups[type] && groups[type].length > 0) {
        this.groupedFeatures.push({ type, features: groups[type] });
        delete groups[type]; // Remove from map to track what's left
      }
    });

    // Add remaining groups
    Object.keys(groups).forEach(type => {
      if (groups[type].length > 0) {
        this.groupedFeatures.push({ type, features: groups[type] });
      }
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
