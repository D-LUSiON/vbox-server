import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TvShowsRouting } from './tv-shows-routing.module';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { TvShowEditComponent } from './tv-show-edit/tv-show-edit.component';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TvShowsRouting,
        SortablejsModule
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
