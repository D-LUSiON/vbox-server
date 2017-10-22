import { Component, OnInit, NgZone } from '@angular/core';
import {
    TvShow,
    TMDBMovie
} from '@app/models';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TvShowsService, NotificationsService, GenresService } from '@app/services';

@Component({
    selector: 'app-tv-show-edit',
    templateUrl: './tv-show-edit.component.html',
    styleUrls: ['./tv-show-edit.component.css']
})
export class TvShowEditComponent implements OnInit {

    tv_show: TvShow = new TvShow({});

    tv_show_data: FormGroup;

    found_tv_show_results: TMDBMovie[] = [];

    modal_shown: boolean = false;

    selected_tv_show: TvShow;

    private _background_dom;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tvShowsService: TvShowsService,
        private notificationsService: NotificationsService,
        private genresServices: GenresService,
        private ngZone: NgZone
    ) {
        // if (this.route.snapshot.params['id'])
        //     this.tv_show = this.tvShowsService.getByID(this.route.snapshot.params['id']);

        this.tv_show_data = new FormGroup({
            '_id': new FormControl(this.tv_show._id),
            'name': new FormControl(this.tv_show.name),
            'original_name': new FormControl(this.tv_show.original_name),
            'overview': new FormControl(this.tv_show.overview),
            'poster': new FormControl(this.tv_show.poster),
            'genre_ids': new FormControl(this.tv_show.genre_ids),
        });
    }

    ngOnInit() {
    }

    getTvShowInfo(event?) {
        let title = event ? event.target.value : this.tv_show_data.value['name'];
        this.tvShowsService.getTvShowInfo(title).subscribe((tv_show_data) => {
            if (tv_show_data.length > 1) {
                this.found_tv_show_results = tv_show_data;
                console.log(this.found_tv_show_results);
                this.modal_shown = true;
            } else {
                this.tvShowsService.getTvShowDetails(this.tv_show_data[0].id).subscribe((res) => {
                    console.log(res);
                    this.tv_show = new TvShow(tv_show_data[0]);
                    // this.tv_show.tv_show_files = this.tv_show_data.value['tv_show_files'];
                    this.tv_show_data.patchValue(this.tv_show);
                    // this._background_dom.style.backgroundImage = `url("${this.tv_show.backdrop_image}")`;
                });
            }
        });
    }

    onSubmit() { }
}
