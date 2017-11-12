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

    private tmdb_api_key: string = '';

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
                this.tmdb_api_key = this.settingsService.settings.api_key;
                this.language = this.settingsService.settings.language;
                subscription.unsubscribe();
            });
        } else {
            this.tmdb_api_key = this.settingsService.settings.api_key;
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
        if (this.movies_loaded)
            return true;
        else
            return new Observable(observer => {
                this.emmiter.asObservable().subscribe(() => {
                    observer.next(true);
                    observer.complete();
                });
            });
    }

    get all_movies() {
        return this.movies;
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
        if (!this.tmdb_api_key) this.tmdb_api_key = this.settingsService.settings.api_key;
        return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmdb_api_key}&query=${title}&language=${this.language}`)
            .map((movie_data) => {
                let found_movie_results = movie_data.json().results;
                let movies_results = [];
                found_movie_results.forEach((fm) => {
                    let found_movie = new Movie(fm);
                    found_movie.genre_ids.forEach((genre_id, i) => {
                        let genre = this.genresService.genres.find((gen) => {
                            return gen.id === genre_id;
                        });
                        found_movie.genres.push({ id: genre_id, name: genre.name });
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

    getMovieDetails(movie_id: number) {
        if (!this.tmdb_api_key) this.tmdb_api_key = this.settingsService.settings.api_key;
        return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${this.tmdb_api_key}&language=${this.language}`)
            .map((movie_data) => {
                console.log(movie_data.json());
                return movie_data.json();
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

    saveMovie(movie: Movie): Observable<any> {
        return new Observable(observer => {
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
                observer.next(response);
                observer.complete();
            });
            this.electron.ipcRenderer.send('Movie:save', movie);
        });
    }

    removeMovie(movie: Movie) {
        this.electron.ipcRenderer.once('Movie:remove:response', (event, response: Movie) => {
            if (response) {
                let idx = this.movies.findIndex((x) => {
                    return x._id === response._id;
                });
                this.movies.splice(idx, 1);
                this.notificationsService.emit({
                    title: 'Movie removed!',
                    message: `Movie <strong>"${response.title} ${(response.title !== response.original_title) ? '<small>(' + response.original_title + ')</small>' : ''}"</strong> was saved removed!`,
                    severity: 'success'
                });
                this.emmiter.next(this.movies_loaded);
            };
        });
        this.electron.ipcRenderer.send('Movie:remove', movie);
    }
}
