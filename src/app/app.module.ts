import { NotificationsService } from '@app/services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgxElectronModule } from 'ngx-electron';

import { AppRouting } from './app-routing.module';

import { SharedModule } from '@app/shared';
import {
    DashboardModule,
    MoviesModule,
    TvShowsModule,
    CollectionsModule,
    SettingsModule,
    ErrorModule,
} from '@app/modules';

import { AppComponent } from './app.component';
import {
    SettingsService,
    MoviesService
 } from '@app/services';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        AppRouting,
        DashboardModule,
        MoviesModule,
        TvShowsModule,
        CollectionsModule,
        SettingsModule,
        ErrorModule,
        NgxElectronModule
    ],
    providers: [
        SettingsService,
        MoviesService,
        NotificationsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
