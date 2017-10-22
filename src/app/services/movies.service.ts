import { Http } from '@angular/http';
import 'rxjs/Rx'; // to use .map() after GET request!
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '@app/models';
import { SettingsService } from './settings.service';
import { NotificationsService } from './notifications.service';
import { GenresService } from './genres.service';
import { TMDBMovie } from '../models/tmdb-movie.model';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class MoviesService {

    movies: Movie[] = [];

    private tmtb_api_key: string = '';

    private language = 'en';

    emmiter: Subject<any> = new Subject();

    movies_loaded: boolean = false;

    constructor(
        private electron: ElectronService,
        private http: Http,
        private notificationsService: NotificationsService,
        private genresService: GenresService,
        private settingsService: SettingsService
    ) {
        if (!this.settingsService.settings_loaded) {
            let subscription = this.settingsService.emmiter.asObservable().subscribe(() => {
                this.tmtb_api_key = this.settingsService.settings.api_key;
                this.language = this.settingsService.settings.language;
                subscription.unsubscribe();
            });
        } else {
            this.tmtb_api_key = this.settingsService.settings.api_key;
        }
        this._getMovies();
    }

    private _getMovies() {
        this.electron.ipcRenderer.once('Movies:get:response', (event, response: Movie[]) => {
            this.movies = response.map((x) => {
                return new Movie(x);
            });

            this.movies_loaded = true;

            this.emmiter.next(this.movies_loaded);
        });

        this.electron.ipcRenderer.send('Movies:get');
    }

    resolve(): Observable<any> | boolean {
        return true;
    }

    get all_movies() {
        return this.movies.slice();
    }

    getByID(id: string) {
        let found_movie;

        this.movies.forEach((movie) => {
            if (movie._id === id)
                found_movie = movie;
        });

        return found_movie;
    }

    getMovieInfo(movie: string) {
        let title = movie.replace(/[ \s\n\.\,\:\(\)\&\#\!]{1,}/gi, '+');
        return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmtb_api_key}&query=${title}&language=${this.language}`)
            .map((movie_data) => {
                let found_movie_results = movie_data.json().results;
                let movies_results = [];
                found_movie_results.forEach((fm) => {
                    let found_movie = new Movie(fm);
                    found_movie.genre_ids.forEach((genre_id, i) => {
                        let genre = this.genresService.genres.find((gen) => {
                            return gen.id === genre_id;
                        });
                        found_movie.genres.push(genre);
                    });
                    movies_results.push(found_movie);
                });
                return movies_results;
            })
            .catch((err) => {
                console.error(err);
                this.notificationsService.emit({
                    title: err.statusText,
                    message: JSON.parse(err._body).status_message,
                    severity: 'error',
                    data: JSON.parse(err._body)
                });
                return Observable.throw('Something went wrong');
            });
    }

    saveMovie(movie: Movie) {
        this.electron.ipcRenderer.once('Movie:save:response', (event, response: Movie) => {
            if (movie._id) {
                let idx = this.movies.findIndex((x) => {
                    return x._id === movie._id;
                });
                this.movies[idx] = new Movie(response);
            } else {
                this.movies.push(new Movie(response));
            }
            this.notificationsService.emit({
                title: 'Movie saved!',
                message: `Movie ${response.title} ${(response.title !== response.original_title) ? '<small>' + response.original_title + '</small>' : ''} was saved successfuly!`,
                severity: 'success'
            });
        });
        this.electron.ipcRenderer.send('Movie:save', movie);
    }
}
