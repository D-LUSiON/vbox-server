import { TvShowsRouting } from './tv-shows-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { TvShowEditComponent } from './tv-show-edit/tv-show-edit.component';

@NgModule({
    imports: [
        CommonModule,
        TvShowsRouting
    ],
    declarations: [
        TvShowsListComponent,
        TvShowEditComponent
    ],
    exports: [
        CommonModule
    ],
})
export class TvShowsModule { }
