import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureFormComponent } from './feature-form/feature-form.component';

const routes: Routes = [
  { path: '', component: FeatureListComponent }, // Lista de Features
  { path: 'new', component: FeatureFormComponent }, // Criar nova Feature
  { path: 'edit/:id', component: FeatureFormComponent }, // Editar Feature existente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
