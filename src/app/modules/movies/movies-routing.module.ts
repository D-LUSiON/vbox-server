import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MoviesService } from '@app/services';

const routes: Routes = [
    {
        path: '',
        component: MoviesListComponent,
        pathMatch: 'full',
        resolve: {
            movies: MoviesService
        }
    },
    {
        path: 'new',
        component: MovieEditComponent
    },
    {
        path: 'edit/:id',
        component: MovieEditComponent,
        resolve: {
            movies: MoviesService
        }
    },
];

export const MoviesRouting: ModuleWithProviders = RouterModule.forChild(routes);
