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

import { FeatureService } from '../../core/services/feature.service';
import { Feature } from '../../core/models/models';

@Component({
  selector: 'app-feature-form',
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
    MatDividerModule
  ],
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss']
})
export class FeatureFormComponent implements OnInit {
  feature: Feature = {
    id: '',
    type: 'feature',
    name: '',
    resume: '',
    description: '',
    book: '',
    page: 0,
    prerequisites: '',
    benefit: '',
    normal: '',
    special: ''
  };

  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private featureService: FeatureService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const response = await this.featureService.getFeatureById(id);
      this.feature = response.data;
    }
  }

  async save() {
    if (this.isEditMode) {
      await this.featureService.updateFeature(this.feature.id, this.feature);
    } else {
      await this.featureService.createFeature(this.feature);
    }
    this.router.navigate(['/features']); // Retorna à lista de Features
  }

  async deleteFeature() {
    if (this.feature.id) {
      await this.featureService.deleteFeature(this.feature.id);
      this.router.navigate(['/features']);
    }
  }

  cancel() {
    this.router.navigate(['/features']);
  }
}
