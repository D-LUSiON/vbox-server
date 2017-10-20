import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesRouting } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MoviesRouting
    ],
    declarations: [
        MoviesListComponent,
        MovieEditComponent
    ],
    exports: [
        CommonModule
    ],
})
export class MoviesModule { }
