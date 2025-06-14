import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./characters-details/characters-details.page').then(m => m.CharacterDetailsPage)
  }
];
