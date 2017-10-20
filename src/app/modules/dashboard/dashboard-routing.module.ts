import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
];

export const DashboardRouting: ModuleWithProviders = RouterModule.forChild(routes);
