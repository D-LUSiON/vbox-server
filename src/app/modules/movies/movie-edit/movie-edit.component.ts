import { GenresService } from '../../../services/genres.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import {
    Movie,
    TMDBMovie,
    Settings
} from '@app/models';
import { MoviesService, SettingsService } from '@app/services';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-movie-edit',
    templateUrl: './movie-edit.component.html',
    styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

    movie: Movie = new Movie({});

    movie_data: FormGroup;

    found_movie_results: TMDBMovie[] = [];

    modal_shown: boolean = false;

    selected_movie: Movie;

    constructor(
        private route: ActivatedRoute,
        private movieService: MoviesService,
        private genresServices: GenresService,
        private ngZone: NgZone
    ) {
        if (this.route.snapshot.params['id'])
            this.movie = this.movieService.getByID(this.route.snapshot.params['id']);

        this.movie_data = new FormGroup({
            '_id': new FormControl(this.movie._id),
            'title': new FormControl(this.movie.title),
            'original_title': new FormControl(this.movie.original_title),
            'overview': new FormControl(this.movie.overview),
            'poster': new FormControl(this.movie.poster),
            'genre_ids': new FormControl(this.movie.genre_ids)
        });
    }

    ngOnInit() { }

    onClickBack() {
        history.back();
    }

    getMovieInfo() {
        this.movieService.getMovieInfo(this.movie_data.value['title']).subscribe((movie_data) => {
            if (movie_data.length > 1) {
                this.found_movie_results = movie_data.slice();
                this.modal_shown = true;
            } else {
                this.movie = new Movie(movie_data[0]);
                this.movie_data.patchValue(this.movie);
            }
        });
    }

    onSelectMovie(movie: Movie) {
        this.selected_movie = movie;
    }

    onCloseModal() {
        this.modal_shown = false;
    }
    onSaveCloseModal() {
        this.modal_shown = false;
        this.movie = new Movie(this.selected_movie);
        this.movie_data.patchValue(this.movie);
        this.selected_movie = undefined;
    }

    onSubmit() {
        console.log(this.movie_data.value);
    }

}
