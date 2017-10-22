import { Component, OnInit, NgZone } from '@angular/core';
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
        private moviesService: MoviesService,
        private ngZone: NgZone,
    ) {
        if (!this.moviesService.movies_loaded) {
            this.moviesService.emmiter.asObservable().subscribe(() => {
                this.ngZone.run(() => {
                    this.movies = this.moviesService.all_movies;
                    this.filtered_movies = this.movies.slice();
                    this.sortMovies();
                });
            });
        } else {
            this.movies = this.moviesService.all_movies;
            this.filtered_movies = this.movies.slice();
            this.sortMovies();
        }
    }

    ngOnInit() { }

    filterMovies(value) {
        this.filtered_movies = [];
        this.movies.forEach((movie, i) => {
            if (movie.title.toLowerCase().indexOf(value.toLowerCase()) > -1 || movie.original_title.toLowerCase().indexOf(value.toLowerCase()) > -1)
                this.filtered_movies.push(movie);
        });
    }

    sortMovies(field_order?) {
        if (!field_order) field_order = 'title,asc';
        let field = field_order.split(',')[0];
        let order = field_order.split(',')[1];

        this.movies = this.movies.sort((a, b) => {
            if (a[field] < b[field] && order === 'asc') return -1;
            if (a[field] < b[field] && order === 'desc') return 1;
            if (a[field] > b[field] && order === 'asc') return 1;
            if (a[field] > b[field] && order === 'desc') return -1;
            if (a[field] === b[field]) return 0;
        });

        this.ngZone.run(() => {
            this.filtered_movies = this.movies.slice();
        });
    }

    removeMovie(movie) {
        if (confirm(`Are you sure you want to remove "${movie.title}"?`))
            this.moviesService.removeMovie(movie);
    }

}
