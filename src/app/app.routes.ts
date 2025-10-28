import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',redirectTo:'characters', pathMatch: 'full'},
    {
        path: 'characters', 
        loadComponent: () => import('./features/characters/characters').then(m => m.Characters),
    },
    {
        path: 'locations', 
        loadComponent: () => import('./features/locations/locations').then(m => m.Locations),
    },
    {
        path: 'episodes', 
        loadComponent: () => import('./features/episodes/episodes').then(m => m.Episodes),
    },
    {path: '**', redirectTo:'characters'}
];
