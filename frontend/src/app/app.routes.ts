import { Routes } from '@angular/router';
import { MainLayoutComponent } from "./main-layout/main-layout.component";

import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainLayoutComponent, // Página inicial
    canActivate: [authGuard],
    children: [
      { path: '', loadChildren: () => import('./index/index-routing.module').then(m => m.IndexRoutingModule) },

      { path: 'features', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
      { path: 'magics', loadChildren: () => import('./magics/magics.module').then(m => m.MagicsModule) },
      { path: 'racial-traits', loadChildren: () => import('./racial-traits/racial-traits.module').then(m => m.RacialTraitsModule) },
      { path: 'class-abilities', loadChildren: () => import('./class-abilities/class-abilities.module').then(m => m.ClassAbilitiesModule) },
      { path: 'characters', loadComponent: () => import('./characters/character-list/character-list.component').then(m => m.CharacterListComponent) },
      { path: 'characters/new', loadComponent: () => import('./characters/character-form/character-form.component').then(m => m.CharacterFormComponent) },
      { path: 'characters/edit/:id', loadComponent: () => import('./characters/character-form/character-form.component').then(m => m.CharacterFormComponent) },
      { path: 'characters/show/:id', loadComponent: () => import('./characters/character-show/character-show.component').then(m => m.CharacterShowComponent) }
    ]
  },
  { path: '**', redirectTo: '' } // Página não encontrada
];
