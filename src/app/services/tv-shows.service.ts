import { TvShow } from '@app/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { ElectronService } from 'ngx-electron';
import { Http } from '@angular/http';
import { NotificationsService } from './notifications.service';
import { SettingsService } from './settings.service';
import { GenresService } from './genres.service';

@Injectable()
export class TvShowsService {

    tv_shows: TvShow[] = [];

    private tmdb_api_key: string = '';

    private language = 'en';

    emmiter: Subject<any> = new Subject();

    tv_shows_loaded: boolean = false;

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
    }

    resolve(): Observable<any> | boolean {
        if (this.tv_shows_loaded)
            return true;
        else {
            return true;
            // Uncomment after loading is ready
            // return new Observable(observer => {
            //     this.emmiter.asObservable().subscribe(() => {
            //         observer.next(true);
            //         observer.complete();
            //     });
            // });
        }
    }

    getTvShowInfo(tv_show: string) {
        let title = tv_show.replace(/[ \s\n\.\,\:\(\)\&\#\!]{1,}/gi, '+');
        return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.tmdb_api_key}&query=${title}&language=${this.language}`)
            .map((tv_show_data) => {
                console.log(tv_show_data.json());
                console.log(this.genresService.genres);
                let found_tv_show_results = tv_show_data.json().results;
                let tv_show_results = [];
                found_tv_show_results.forEach((ftvs) => {
                    let found_tv_show = new TvShow(ftvs);
                    found_tv_show.genre_ids.forEach((genre_id, i) => {
                        let genre = this.genresService.genres.find((gen) => {
                            return gen.id === genre_id;
                        });
                        found_tv_show.genres.push(genre);
                    });
                    tv_show_results.push(found_tv_show);
                });
                this.tv_shows = tv_show_results;
                console.log(this.tv_shows);

                return this.tv_shows;
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

    getTvShowDetails(tv_show_id: number) {
        return this.http.get(`https://api.themoviedb.org/3/tv/${tv_show_id}?api_key=${this.tmdb_api_key}&language=${this.language}`)
        .map((tv_show_data) => {
            console.log(tv_show_data.json());
            return tv_show_data.json();
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
