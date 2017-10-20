import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent
    },
];

export const CategoriesRouting: ModuleWithProviders = RouterModule.forChild(routes);
