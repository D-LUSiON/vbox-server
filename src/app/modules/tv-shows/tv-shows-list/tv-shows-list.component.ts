import { Component, OnInit } from '@angular/core';
import { TvShow } from '@app/models';

@Component({
    selector: 'app-tv-shows-list',
    templateUrl: './tv-shows-list.component.html',
    styleUrls: ['./tv-shows-list.component.css']
})
export class TvShowsListComponent implements OnInit {

    tv_shows: TvShow[] = [];

    filtered_tv_shows: TvShow[] = [];

    constructor() { }

    ngOnInit() {
    }

    removeTvShow(tv_show: TvShow) {

    }

}
