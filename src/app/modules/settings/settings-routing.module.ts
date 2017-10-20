import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: 'settings',
                component: SettingsComponent
            },
        ]
    },
];

export const SettingsRouting: ModuleWithProviders = RouterModule.forChild(routes);
