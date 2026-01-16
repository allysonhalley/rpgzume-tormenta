import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FeatureService } from '../../core/services/feature.service';
import { Feature } from '../../core/models/models';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatIcon],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = [];

  constructor(private featureService: FeatureService, private router: Router) {}

  async ngOnInit() {
    try {
      const response = await this.featureService.getAllFeatures();
      this.features = response.data || [];
    } catch (error) {
      console.error('Erro ao buscar features:', error);
    }
  }
  addFeature() {
    this.router.navigate(['/features/new']);
  }
}
