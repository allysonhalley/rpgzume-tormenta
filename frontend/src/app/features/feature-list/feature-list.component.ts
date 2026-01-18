import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FeatureService } from '../../core/services/feature.service';
import { Feature } from '../../core/models/models';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'; // Corrected import
import { Router } from "@angular/router";
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatIconModule, MatTabsModule],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = [];
  groupedFeatures: { type: string, features: Feature[] }[] = [];

  constructor(private featureService: FeatureService, private router: Router) { }

  async ngOnInit() {
    try {
      const response = await this.featureService.getAllFeatures();
      this.features = response.data || [];
      this.groupFeatures();
    } catch (error) {
      console.error('Erro ao buscar features:', error);
    }
  }

  private groupFeatures() {
    const groups: { [key: string]: Feature[] } = {};

    this.features.forEach(feature => {
      const type = feature.featureType || 'Outros'; // Default to 'Outros' if undefined
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(feature);
    });

    this.groupedFeatures = Object.keys(groups).sort().map(type => ({
      type,
      features: groups[type]
    }));
  }

  addFeature() {
    this.router.navigate(['/features/new']);
  }
}
