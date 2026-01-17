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

import { MagicService } from '../../core/services/magic.service';
import { Magic } from '../../core/models/models';

@Component({
    selector: 'app-magic-form',
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
    templateUrl: './magic-form.component.html',
    styleUrls: ['./magic-form.component.scss']
})
export class MagicFormComponent implements OnInit {
    magic: Magic = {
        // id is undefined for new magics
        name: '',
        level: '',
        book: '',
        page: 0,
        type: '',
        components: '',
        castTime: '',
        range: '',
        targetArea: '',
        duration: '',
        savingThrow: '',
        spellResistance: '',
        effect: '',
        resume: '',
        description: ''
    };

    isEditMode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private magicService: MagicService
    ) { }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            try {
                const response = await this.magicService.getMagicById(id);
                this.magic = response.data;
            } catch (error) {
                console.error('Error loading magic', error);
            }
        }
    }

    async save() {
        try {
            if (this.isEditMode && this.magic.id) {
                await this.magicService.updateMagic(this.magic.id!, this.magic);
            } else {
                await this.magicService.createMagic(this.magic);
            }
            this.router.navigate(['/magics']);
        } catch (error) {
            console.error('Error saving magic', error);
        }
    }

    async deleteMagic() {
        if (this.magic.id) {
            try {
                await this.magicService.deleteMagic(this.magic.id!);
                this.router.navigate(['/magics']);
            } catch (error) {
                console.error('Error deleting magic', error);
            }
        }
    }

    cancel() {
        this.router.navigate(['/magics']);
    }
}
