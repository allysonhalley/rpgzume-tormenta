import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { RacialTraitsService } from '../../core/services/racial-traits.service';
import { PlayerClassService } from '../../core/services/player-class.service';
import { FeatureService } from '../../core/services/feature.service';
import { MagicService } from '../../core/services/magic.service';
import { Character, RacialTraits, ClassAbility, Feature, Magic, PlayerClass } from '../../core/models/models';

import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-character-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ],
    templateUrl: './character-form.component.html',
    styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {
    character: Character = {
        userId: 0, // Placeholder, set in ngOnInit
        name: '',
        raceId: '',
        principalClassId: '',
        featureIds: [],
        magicIds: []
    };

    races: RacialTraits[] = [];
    classes: PlayerClass[] = [];
    features: Feature[] = [];
    magics: Magic[] = [];
    isEditMode = false;

    constructor(
        private characterService: CharacterService,
        private racialTraitsService: RacialTraitsService,
        private playerClassService: PlayerClassService,
        private featuresService: FeatureService,
        private magicsService: MagicService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const userId = this.authService.getUserId();
        if (userId) {
            this.character.userId = userId;
        } else {
            console.error('User not authenticated');
            // Handle unauthenticated state
        }
        this.loadDependencies();

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.loadCharacter(id);
        }
    }

    loadDependencies(): void {
        this.racialTraitsService.getAllRacialTraits().subscribe({
            next: (data: RacialTraits[]) => this.races = data,
            error: (err) => console.error('Error loading races', err)
        });
        this.playerClassService.getAllPlayerClasses().subscribe({
            next: (data: PlayerClass[]) => this.classes = data,
            error: (err) => console.error('Error loading classes', err)
        });
        this.featuresService.getAllFeatures().then((response: any) => this.features = response.data).catch(err => console.error('Error loading features', err));
        this.magicsService.getAllMagics().then((response: any) => this.magics = response.data).catch(err => console.error('Error loading magics', err));
    }

    loadCharacter(id: string): void {
        this.characterService.getCharacterById(id).subscribe({
            next: (char) => {
                this.character = char;
                // Ensure array fields are initialized if null
                if (!this.character.featureIds) this.character.featureIds = [];
                if (!this.character.magicIds) this.character.magicIds = [];
            },
            error: (err) => console.error('Error loading character', err)
        });
    }

    save(): void {
        if (this.isEditMode && this.character.id) {
            this.characterService.updateCharacter(this.character.id, this.character).subscribe({
                next: () => this.router.navigate(['/characters']),
                error: (err) => console.error('Error updating character', err)
            });
        } else {
            this.characterService.createCharacter(this.character).subscribe({
                next: () => this.router.navigate(['/characters']),
                error: (err) => console.error('Error saving character', err)
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/characters']);
    }
}
