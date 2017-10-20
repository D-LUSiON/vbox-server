import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { TvShowEditComponent } from './tv-show-edit/tv-show-edit.component';

const routes: Routes = [
    {
        path: '',
        component: TvShowsListComponent,
        children: [
            {
                path: 'list',
                component: TvShowsListComponent
            },
            {
                path: 'edit/:id',
                component: TvShowEditComponent
            },
        ]
    },
];

export const TvShowsRouting: ModuleWithProviders = RouterModule.forChild(routes);
