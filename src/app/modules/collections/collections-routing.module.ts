import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsListComponent } from './collections-list/collections-list.component';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';

const routes: Routes = [
    {
        path: '',
        component: CollectionsListComponent,
        children: [
            {
                path: 'list',
                component: CollectionsListComponent
            },
            {
                path: 'edit/:id',
                component: CollectionEditComponent
            },
        ]
    },
];

export const CollectionsRouting: ModuleWithProviders = RouterModule.forChild(routes);
