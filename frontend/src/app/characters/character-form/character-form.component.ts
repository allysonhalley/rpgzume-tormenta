
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
import { Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { RacialTraitsService } from '../../core/services/racial-traits.service';
import { ClassAbilitiesService } from '../../core/services/class-abilities.service';
import { FeatureService } from '../../core/services/feature.service';
import { MagicService } from '../../core/services/magic.service';
import { Character, RacialTraits, ClassAbilities, Feature, Magic } from '../../core/models/models';

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
        classId: '',
        featureIds: [],
        magicIds: []
    };

    races: RacialTraits[] = [];
    classes: ClassAbilities[] = []; // We need to flatten the grouped abilities or use a service that returns list
    features: Feature[] = [];
    magics: Magic[] = [];

    constructor(
        private characterService: CharacterService,
        private racialTraitsService: RacialTraitsService,
        private classAbilitiesService: ClassAbilitiesService,
        private featuresService: FeatureService,
        private magicsService: MagicService,
        private router: Router,
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
    }

    loadDependencies(): void {
        this.racialTraitsService.getAllRacialTraits().subscribe((data: RacialTraits[]) => this.races = data);
        this.classAbilitiesService.getAllClassAbilities().subscribe((data: ClassAbilities[]) => {
            // ClassAbilitiesService returns list of ClassAbilities (Card wrappers)
            this.classes = data;
        });
        this.featuresService.getAllFeatures().then(response => this.features = response.data);
        this.magicsService.getAllMagics().then(response => this.magics = response.data);
    }

    save(): void {
        this.characterService.createCharacter(this.character).subscribe({
            next: () => this.router.navigate(['/characters']),
            error: (err) => console.error('Error saving character', err)
        });
    }

    cancel(): void {
        this.router.navigate(['/characters']);
    }
}
