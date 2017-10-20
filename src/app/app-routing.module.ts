import { SettingsService } from '@app/services';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '@env/environment';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', },
    { path: 'categories', loadChildren: './modules/categories/categories.module#CategoriesModule' },
    { path: 'movies', loadChildren: './modules/movies/movies.module#MoviesModule' },
    { path: 'tv-shows', loadChildren: './modules/tv-shows/tv-shows.module#TvShowsModule' },
    { path: 'collections', loadChildren: './modules/collections/collections.module#CollectionsModule' },
    {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule',
        resolve: {
            settings: SettingsService
        }
    },
    { path: 'error', loadChildren: './modules/error/error.module#ErrorModule' },
    { path: '**', redirectTo: 'error/not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRouting { }
