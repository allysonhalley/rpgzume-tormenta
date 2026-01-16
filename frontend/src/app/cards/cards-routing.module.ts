import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardFormComponent } from './card-form/card-form.component';

const routes: Routes = [
  { path: '', component: CardListComponent },
  { path: 'new', component: CardFormComponent },
  { path: 'edit/:id', component: CardFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
