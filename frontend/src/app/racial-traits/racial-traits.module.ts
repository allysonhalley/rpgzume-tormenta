import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RacialTraitsListComponent } from './racial-traits-list/racial-traits-list.component';

const routes: Routes = [
    { path: '', component: RacialTraitsListComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RacialTraitsListComponent // Import standalone component
    ]
})
export class RacialTraitsModule { }
