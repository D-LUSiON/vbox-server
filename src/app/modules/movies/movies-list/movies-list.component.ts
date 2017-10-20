import { Component, OnInit } from '@angular/core';
import { Movie } from '@app/models';
import { MoviesService } from '@app/services';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

    movies: Movie[] = [];

    filtered_movies: Movie[] = [];

    constructor(
        private moviesService: MoviesService
    ) {
        this.movies = this.moviesService.all_movies;
        this.filtered_movies = this.movies.slice();
    }

    ngOnInit() {}

    filterMovies(value) {
        this.filtered_movies = [];
        this.movies.forEach((movie, i) => {
            if (movie.title.toLowerCase().indexOf(value.toLowerCase()) > -1)
                this.filtered_movies.push(movie);
        });
    }

}
