import { Component, OnInit, NgZone } from '@angular/core';
import { TvShowsService } from '@app/services';
import { TvShow } from '@app/models';

@Component({
    selector: 'app-tv-shows-list',
    templateUrl: './tv-shows-list.component.html',
    styleUrls: ['./tv-shows-list.component.css']
})
export class TvShowsListComponent implements OnInit {

    tv_shows: TvShow[] = [];

    filtered_tv_shows: TvShow[] = [];

    constructor(
        private tvShowsService: TvShowsService,
        private ngZone: NgZone,
    ) {
        if (!this.tvShowsService.tv_shows_loaded) {
            this.tvShowsService.emmiter.asObservable().subscribe(() => {
                this.ngZone.run(() => {
                    this.tv_shows = this.tvShowsService.tv_shows;
                    this.filtered_tv_shows = this.tv_shows.slice();
                    this.sortTvShows();
                });
            });
        } else {
            this.ngZone.run(() => {
                this.tv_shows = this.tvShowsService.tv_shows;
                this.filtered_tv_shows = this.tv_shows.slice();
                this.sortTvShows();
            });
        }
    }

    ngOnInit() {
    }

    filterTvShows(value) {
        this.filtered_tv_shows = [];
        this.tv_shows.forEach((tv_show, i) => {
            if (tv_show.name.toLowerCase().indexOf(value.toLowerCase()) > -1 || tv_show.original_name.toLowerCase().indexOf(value.toLowerCase()) > -1)
                this.filtered_tv_shows.push(tv_show);
        });
    }

    sortTvShows(field_order?) {
        if (!field_order) field_order = 'name,asc';
        let field = field_order.split(',')[0];
        let order = field_order.split(',')[1];

        this.tv_shows = this.tv_shows.sort((a, b) => {
            if (a[field] < b[field] && order === 'asc') return -1;
            if (a[field] < b[field] && order === 'desc') return 1;
            if (a[field] > b[field] && order === 'asc') return 1;
            if (a[field] > b[field] && order === 'desc') return -1;
            if (a[field] === b[field]) return 0;
        });

        this.ngZone.run(() => {
            this.filtered_tv_shows = this.tv_shows.slice();
        });
    }

    removeTvShow(tv_show: TvShow) {
        console.log('Remove', tv_show);
        if (confirm(`Are you sure you want to remove "${tv_show.name}"?`))
            this.tvShowsService.removeTvShow(tv_show);
    }

}
