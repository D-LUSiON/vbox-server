import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { Movie } from '@app/models';
import { MoviesService } from '@app/services';
import {
    FormGroup,
    FormControl
} from '@angular/forms';

@Component({
    selector: 'app-movie-edit',
    templateUrl: './movie-edit.component.html',
    styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

    movie: Movie = new Movie({});

    movie_data: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private movieService: MoviesService,
    ) {
        if (this.route.snapshot.params['id'])
            this.movie = this.movieService.getByID(this.route.snapshot.params['id']);

        this.movie_data = new FormGroup({
            '_id': new FormControl(this.movie._id),
            'title': new FormControl(this.movie.title),
            'poster': new FormControl(this.movie.poster),
        });
        console.log(this.movie);
    }

    ngOnInit() {
    }

    onClickBack() {
        history.back();
    }

    onSubmit() {
        console.log(this.movie_data.value);
    }

}
