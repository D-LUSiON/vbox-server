import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { TvShowEditComponent } from './tv-show-edit/tv-show-edit.component';
import { TvShowsService } from '@app/services';

const routes: Routes = [
    {
        path: '',
        component: TvShowsListComponent,
        pathMatch: 'full',
        resolve: {
            movies: TvShowsService
        }
    },
    {
        path: 'new',
        component: TvShowEditComponent
    },
    {
        path: 'edit/:id',
        component: TvShowEditComponent,
        resolve: {
            movies: TvShowsService
        }
    },
];

export const TvShowsRouting: ModuleWithProviders = RouterModule.forChild(routes);
