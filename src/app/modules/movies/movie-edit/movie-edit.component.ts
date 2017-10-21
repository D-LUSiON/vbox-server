import { GenresService } from '../../../services/genres.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
    Movie,
    TMDBMovie,
    Settings,
    LocalFile
} from '@app/models';
import {
    MoviesService,
    SettingsService,
    NotificationsService
} from '@app/services';

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

    private _background_dom;

    constructor(
        private route: ActivatedRoute,
        private movieService: MoviesService,
        private notificationsService: NotificationsService,
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
            'genre_ids': new FormControl(this.movie.genre_ids),
            'movie_files': new FormControl(this.movie.movie_files)
        });

        // TODO: create "BackgroundService" for changing the background
        this._background_dom = document.querySelector('#Background');
        if (this.movie.backdrop_image) {
            this._background_dom.style.backgroundImage = this.movie.backdrop_image;
        }
    }

    ngOnInit() { }

    onClickBack() {
        history.back();
    }

    getMovieInfo(event?) {
        let title = event ? event.target.value : this.movie_data.value['title'];
        this.movieService.getMovieInfo(title).subscribe((movie_data) => {
            if (movie_data.length > 1) {
                this.found_movie_results = movie_data.slice();
                this.modal_shown = true;
            } else {
                this.movie = new Movie(movie_data[0]);
                this.movie.movie_files = this.movie_data.value['movie_files'];
                this.movie_data.patchValue(this.movie);
                this._background_dom.style.backgroundImage = `url("${this.movie.backdrop_image}")`;
            }
        });
    }

    onFilesSelected(event) {
        let selected_files = this.movie_data.value['movie_files'],
            duplicate_files = [],
            skipped_files = [];

        for (let i = 0, max = event.target.files.length; i < max; i++) {
            let f = new LocalFile(event.target.files[i]);
            if (f.type && f.type.match('video')) {
                let exists = !!selected_files.find((x) => {
                    return x.path === f.path;
                });

                if (exists)
                    duplicate_files.push(f);
                else
                    selected_files.push(f);

            } else {
                skipped_files.push(f);
            }
        }

        if (duplicate_files.length > 0) {
            this.notificationsService.emit({
                title: `${duplicate_files.length} duplicate file(s)`,
                severity: 'error',
                message: `You've selected ${duplicate_files.length} file(s) that already are in the list!`
            });
        }

        if (skipped_files.length > 0) {
            this.notificationsService.emit({
                title: `${skipped_files.length} file(s) skipped!`,
                severity: 'error',
                message: `You've selected ${skipped_files.length} file(s) that are not valid video files!`
            });
        }

        if (
            this.movie_data.value['movie_files'] &&
            (
                this.movie_data.value['movie_files'].length === 0 ||
                this.movie_data.value['movie_files'][0].path === selected_files[0].path
            ) &&
            this.movie_data.value['title'] === ''
        ) {
            let year = selected_files[0].name.match(/[0-9]{4}/g);

            if (year) {
                let idx = selected_files[0].name.match(year).index;
                this.movie_data.patchValue({
                    'title': selected_files[0].name.replace(/\./g, ' ').substr(0, idx)
                });
                this.getMovieInfo();
            } else {
                this.movie_data.patchValue({
                    'title': selected_files[0].name.replace(/\./g, ' ')
                });
            }
        }

        this.movie_data.patchValue({
            'movie_files': selected_files
        });

        event.target.value = '';
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
        this.movie.movie_files = this.movie_data.value['movie_files'];
        this.movie_data.patchValue(this.movie);
        this._background_dom.style.backgroundImage = `url("${this.movie.backdrop_image}")`;
        this.selected_movie = undefined;
    }

    removeFile(file: LocalFile) {
        let files = this.movie_data.value['movie_files'],
            idx = files.findIndex((x) => {
                return x.path === file.path;
            });

        files.splice(idx, 1);

        this.movie_data.patchValue({
            'movie_files': files
        });
    }

    onSubmit() {
        this.movieService.saveMovie(this.movie);
    }

}
