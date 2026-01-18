import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { Card, Magic } from "../../core/models/models";
import { MagicService } from "../../core/services/magic.service";
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-magic-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTabsModule],
  templateUrl: './magic-list.component.html',
  styleUrls: ['../../shared/shared-list.component.scss', './magic-list.component.scss']
})
export class MagicListComponent implements OnInit {
  magics: Magic[] = [];
  groupedMagics: { type: string, levels: { level: string, magics: Magic[] }[] }[] = [];

  constructor(private magicService: MagicService, private router: Router) { }

  async ngOnInit() {
    try {
      const response = await this.magicService.getAllMagics();
      this.magics = response.data || [];
      this.groupMagics();
    } catch (error) {
      console.error('Erro ao buscar magias:', error);
    }
  }

  private groupMagics() {
    // 1. Group by Type
    const typeGroups: { [type: string]: Magic[] } = {};

    this.magics.forEach(magic => {
      let type = magic.magicType || 'Outros';
      if (!typeGroups[type]) {
        typeGroups[type] = [];
      }
      typeGroups[type].push(magic);
    });

    // 2. For each Type, Group by Level
    this.groupedMagics = Object.keys(typeGroups).sort().map(type => {
      const magicsByType = typeGroups[type];
      const levelGroups: { [level: string]: Magic[] } = {};

      magicsByType.forEach(magic => {
        const level = magic.level || '0'; // Default to 0 if undefined
        if (!levelGroups[level]) {
          levelGroups[level] = [];
        }
        levelGroups[level].push(magic);
      });

      // Sort levels numerically
      const sortedLevels = Object.keys(levelGroups).sort((a, b) => {
        const numA = parseInt(a, 10);
        const numB = parseInt(b, 10);
        if (isNaN(numA)) return 1; // Put non-numbers at end
        if (isNaN(numB)) return -1;
        return numA - numB;
      }).map(level => ({
        level,
        magics: levelGroups[level]
      }));

      return {
        type,
        levels: sortedLevels
      };
    });
  }

  addMagic() {
    this.router.navigate(['/magics/new']);
  }

  editMagic(id: string | undefined) {
    if (id) {
      this.router.navigate(['/magics/edit', id]);
    }
  }
}
