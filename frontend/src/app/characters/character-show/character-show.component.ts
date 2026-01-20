import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CharacterService } from '../character.service';
import { Character, Feature, Magic } from '../../core/models/models';
import { FeatureService } from '../../core/services/feature.service';
import { MagicService } from '../../core/services/magic.service';

@Component({
    selector: 'app-character-show',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatToolbarModule
    ],
    templateUrl: './character-show.component.html',
    styleUrls: ['./character-show.component.scss']
})
export class CharacterShowComponent implements OnInit {
    character: Character | null = null;
    features: Feature[] = [];
    magics: Magic[] = [];
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private characterService: CharacterService,
        private featureService: FeatureService,
        private magicService: MagicService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadCharacter(id);
        } else {
            this.router.navigate(['/characters']);
        }
    }

    loadCharacter(id: string): void {
        this.characterService.getCharacterById(id).subscribe({
            next: (char) => {
                this.character = char;
                this.loadDetails(char);
            },
            error: (err) => {
                console.error('Error loading character', err);
                this.loading = false;
            }
        });
    }

    loadDetails(character: Character): void {
        // Here we could fetch full objects if the character DTO only has IDs/Names, 
        // but currently the show view might just need what's in the DTO or we fetch more if needed.
        // For now, let's assume we want to show lists of features/magics.
        // If DTO has IDs, we might want to fetch details. 
        // Let's assume for a "Show" view, we might want to display descriptions.

        // Note: The current DTO has lists of IDs. To show details, we'd need to fetch them.
        // Ideally, the backend would return a detailed DTO or we fetch individually.
        // Given the current service structure, let's just display what we have or fetch all if efficient? 
        // Fetching all might be heavy. Let's see if we can resolve IDs to info.
        // Actually, looking at the previous file views, the `FeatureService` has `getAllFeatures`.
        // We can fetch all and filter, or if there's a `getById`, use that.
        // Let's check FeatureService again to be sure.

        // For MVP of this task, let's just assume we can display IDs or Names if available.
        // The DTO has `featureIds` and `magicIds`.
        // Let's fetch all features/magics to map names for now (inefficient but works with current services).

        const featurePromises = this.featureService.getAllFeatures().then((response: any) => {
            const allFeatures: Feature[] = response.data;
            this.features = allFeatures.filter(f => character.featureIds.includes(f.id!));
        });

        const magicPromises = this.magicService.getAllMagics().then((response: any) => {
            const allMagics: Magic[] = response.data;
            this.magics = allMagics.filter(m => character.magicIds.includes(m.id!));
        });

        Promise.all([featurePromises, magicPromises]).finally(() => {
            this.loading = false;
        });
    }

    back(): void {
        this.router.navigate(['/characters']);
    }
}
