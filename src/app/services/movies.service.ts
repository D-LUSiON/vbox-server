import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '@app/models';

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
            title: 'Hunger Games - Mocking Jay pt.1',
            poster: 'assets/posters/mocking-jay-movieposter.jpg'
        }),
    ];

    constructor() { }

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
}
