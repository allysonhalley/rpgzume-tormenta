import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClassAbilitiesListComponent } from './class-abilities-list/class-abilities-list.component';

const routes: Routes = [
    { path: '', component: ClassAbilitiesListComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ClassAbilitiesListComponent // Import standalone component
    ]
})
export class ClassAbilitiesModule { }
