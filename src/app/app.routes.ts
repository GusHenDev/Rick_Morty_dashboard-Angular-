import { Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout';
import { AuthGuard } from './core/auth.guards';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'characters', pathMatch: 'full' },
            {
                path: 'characters',
                loadComponent: () => import('./features/characters/characters').then(m => m.Characters),
            },
            {
                path: 'characters/:id',
                loadComponent: () => import('./features/characters/character-detail/character-detail')
                    .then(m => m.CharacterDetail),
            },
            {
                path: 'locations',
                loadComponent: () => import('./features/locations/locations').then(m => m.Locations),
            },
            {
                path: 'episodes',
                loadComponent: () => import('./features/episodes/episodes').then(m => m.Episodes),
            },

        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(m => m.Login),
    },
    { path: '**', redirectTo: '' }
];
