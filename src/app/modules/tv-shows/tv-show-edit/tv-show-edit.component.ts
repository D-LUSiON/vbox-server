import { Component, OnInit, NgZone } from '@angular/core';
import {
    TvShow,
    Season,
    LocalFile
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

    current_poster: string;

    selected_tab: string = 'info';

    tv_show: TvShow = new TvShow({});

    tv_show_seasons = [];

    tv_show_data: FormGroup;

    found_tv_show_results: TvShow[] = [];

    modal_shown: boolean = false;

    selected_tv_show: TvShow;

    selected_season: Season;

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

        // TODO: create "BackgroundService" for changing the background
        this._background_dom = document.querySelector('#Background');
        if (this.tv_show.backdrop_image) {
            this._background_dom.style.backgroundImage = this.tv_show.backdrop_image;
        }
    }

    ngOnInit() { }

    changeTab(e, tab) {
        e.preventDefault();
        this.selected_tab = tab;
        if (tab === 'info')
            this.current_poster = this.tv_show.poster;
        else
            this.current_poster = this.selected_season.poster? this.selected_season.poster : this.tv_show.poster;
    }

    getTvShowInfo(e?) {
        let title = e ? e.target.value : this.tv_show_data.value['name'];
        this.tvShowsService.getTvShowInfo(title).subscribe((tv_show_data: TvShow[]) => {
            if (tv_show_data.length > 1) {
                this.found_tv_show_results = tv_show_data;
                this.modal_shown = true;
            } else {
                this.tvShowsService.getTvShowDetails(tv_show_data[0].id).subscribe((res) => {
                    this.tv_show = new TvShow(res);
                    this.selected_season = this.tv_show.seasons[0];
                    this.tv_show_data.patchValue(this.tv_show);
                    this.current_poster = this.tv_show.poster;
                    this._background_dom.style.backgroundImage = `url("${this.tv_show.backdrop_image}")`;
                });
            }
        });
    }

    getSeasonDetails(season_num: number) {
        this.tvShowsService.getSeasonDetails(this.tv_show.id, season_num).subscribe(season_info => {
            console.log(season_info);
        });
    }

    onSelectTVShow(tv_show: TvShow) {
        this.selected_tv_show = tv_show;
    }

    onCloseModal() {
        this.modal_shown = false;
    }

    onSaveCloseModal() {
        this.tvShowsService.getTvShowDetails(this.selected_tv_show.id).subscribe((res) => {
            this.tv_show = new TvShow(res);
            this.selected_season = this.tv_show.seasons[0];
            this.tv_show_data.patchValue(this.tv_show);
            this.current_poster = this.tv_show.poster;
            this._background_dom.style.backgroundImage = `url("${this.tv_show.backdrop_image}")`;
            this.modal_shown = false;
            console.log(this.tv_show);
        });
    }

    onChangeSeason(e, season_number) {
        e.preventDefault();
        let idx = season_number - (this.tv_show.seasons[0].season_number);
        this.selected_season = this.tv_show.seasons[idx];
        this.current_poster = this.selected_season.poster? this.selected_season.poster : this.tv_show.poster;
    }

    onFilesSelected(event) {
        let duplicate_files = [],
            skipped_files = [];

        for (let i = 0, max = event.target.files.length; i < max; i++) {
            let f = new LocalFile(event.target.files[i]);
            if (f.type && f.type.match('video')) {
                let exists = !!this.selected_season.files.find((x) => {
                    return x.path === f.path;
                });

                if (exists)
                    duplicate_files.push(f);
                else
                    this.selected_season.files.push(f);

            } else {
                skipped_files.push(f);
            }
        }

        if (duplicate_files.length > 0) {
            this.notificationsService.emit({
                title: `${duplicate_files.length} duplicate file(s)`,
                severity: 'error',
                message: `You've selected ${duplicate_files.length} file(s) that already are in the list!`
            });
        }

        if (skipped_files.length > 0) {
            this.notificationsService.emit({
                title: `${skipped_files.length} file(s) skipped!`,
                severity: 'error',
                message: `You've selected ${skipped_files.length} file(s) that are not valid video files!`
            });
        }

        if (this.selected_season.files.length < this.selected_season.episode_count) {
            for (let i = 0, max = this.selected_season.episode_count - this.selected_season.files.length; i < max; i++) {
                this.selected_season.files.push(new LocalFile({}));
            }
        }

        event.target.value = '';
    }

    removeFile(file: LocalFile) {
        let idx = this.selected_season.files.findIndex((x) => {
                return x.path === file.path;
            });

        this.selected_season.files.splice(idx, 1);
    }

    onSubmit() {
        console.log(this.tv_show);
        if (this.tv_show.name)
            this.tvShowsService.saveTvShow(this.tv_show).subscribe((tv_show_data: TvShow) => {
                console.log('TV Show saved!', tv_show_data);
                if (!this.tv_show._id && tv_show_data._id)
                    this.router.navigate(['/tv_shows', 'edit', tv_show_data._id]);
            });
    }
}
