import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagicListComponent } from "./magic-list/magic-list.component";
import { MagicFormComponent } from './magic-form/magic-form.component';

const routes: Routes = [
  { path: '', component: MagicListComponent },
  { path: 'new', component: MagicFormComponent },
  { path: 'edit/:id', component: MagicFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagicsRoutingModule { }
