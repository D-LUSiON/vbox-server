import { Http } from '@angular/http';
import 'rxjs/Rx'; // to use .map() after GET request!
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '@app/models';
import { SettingsService } from './settings.service';
import { NotificationsService } from './notifications.service';
import { GenresService } from './genres.service';
import { TMDBMovie } from '../models/tmdb-movie.model';

@Injectable()
export class MoviesService {

    movies: Movie[] = [
        new Movie({
            _id: '231tfag24',
            title: 'Deadpool',
            poster: 'assets/posters/deadpool--deadpool-free.jpg'
        }),
        new Movie({
            _id: 'het23qg2w',
            title: 'Elysium',
            poster: 'assets/posters/elysium-movie-poster.jpg'
        }),
        new Movie({
            _id: 'v2vtg35yhwsg',
            title: 'John Wick',
            poster: 'assets/posters/john-wick-movieposter.jpg'
        }),
        new Movie({
            _id: 'g23gqaeg24',
            title: 'John Wick - chapter 2',
            poster: 'assets/posters/john-wick-chapter-2-poster.jpg'
        }),
        new Movie({
            _id: 'iu4r5e',
            title: 'Batman - the Dark Knight',
            poster: 'assets/posters/batman--dark-knight--movie-poster.jpg'
        }),
        new Movie({
            _id: '54hwreghw',
            title: 'R.I.P.D.',
            poster: 'assets/posters/ripd_xlg.jpg'
        }),
        new Movie({
            _id: '54erhahbsd',
            title: 'Star Trek',
            poster: 'assets/posters/star-trek-movie-poster.jpg'
        }),
        new Movie({
            _id: 'xcb3qhhada',
            title: 'The Martian',
            poster: 'assets/posters/martian_movie-poster-new.jpg'
        }),
        new Movie({
            _id: '24egsag234h3',
            title: 'Ghost in the Shell',
            poster: 'assets/posters/ghost_in_the_shell_xlg.jpg'
        }),
        new Movie({
            _id: 'g3erhbSg2q3',
            title: 'Pirates of the Caribbean 5',
            poster: 'assets/posters/Pirates-of-the-Caribbean-5-Movie-Poster.jpg'
        }),
        new Movie({
            _id: 'sgwahgq3h',
            title: 'The Avengers',
            poster: 'assets/posters/newavengersposter.jpg'
        }),
        new Movie({
            _id: 'sadg234tg2qg',
            title: 'Alien - Covenant',
            poster: 'assets/posters/alien_covenant_ver4.jpg'
        }),
        new Movie({
            _id: 'gbwegwasghwea',
            title: 'Tarzan',
            poster: 'assets/posters/tarzan_ver3_xlg.jpg'
        }),
        new Movie({
            _id: 'gswegwSgewg',
            title: 'Hunger Games - Mockingjay pt.1',
            poster: 'assets/posters/mocking-jay-movieposter.jpg'
        }),
    ];

    private tmtb_api_key: string = '';

    constructor(
        private http: Http,
        private notificationsService: NotificationsService,
        private genresService: GenresService,
        private settingsService: SettingsService
    ) {
        if (!this.settingsService.settings_loaded) {
            let subscription = this.settingsService.emmiter.asObservable().subscribe(() => {
                this.tmtb_api_key = this.settingsService.settings.api_key;
                subscription.unsubscribe();
            });
        }
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
        return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmtb_api_key}&query=${title}`)
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
                console.log(movies_results);
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
}
