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
        this._getTvShows();
    }

    _getTvShows() {
        this.electron.ipcRenderer.once('TvShows:get:response', (event, response: TvShow[]) => {
            this.tv_shows = response.map((x) => {
                return new TvShow(x);
            });

            this.tv_shows_loaded = true;

            this.emmiter.next(this.tv_shows_loaded);
        });

        this.electron.ipcRenderer.send('TvShows:get');
    }

    resolve(): Observable<any> | boolean {
        if (this.tv_shows_loaded)
            return true;
        else {
            return new Observable(observer => {
                this.emmiter.asObservable().subscribe(() => {
                    console.log(this.tv_shows);

                    observer.next(true);
                    observer.complete();
                });
            });
        }
    }

    get all_tv_shows() {
        return this.tv_shows;
    }

    getTvShowInfo(tv_show: string) {
        if (!this.tmdb_api_key) this.tmdb_api_key = this.settingsService.settings.api_key;
        let title = tv_show.replace(/[ \s\n\.\,\:\(\)\&\#\!]{1,}/gi, '+');
        return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.tmdb_api_key}&query=${title}&language=${this.language}`)
            .map((tv_show_data) => {
                let found_tv_show_results = tv_show_data.json().results;
                let tv_show_results = [];
                found_tv_show_results.forEach((ftvs) => {
                    let found_tv_show = new TvShow(ftvs);
                    found_tv_show.genre_ids.forEach((genre_id: number, i: number) => {
                        let genre = this.genresService.genres.find((gen: { id: number; name: string; }) => {
                            return gen.id === genre_id;
                        }) as { id: number; name: string; };
                        found_tv_show.genres.push(genre);
                    });
                    tv_show_results.push(found_tv_show);
                });
                this.tv_shows = tv_show_results;

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
        if (!this.tmdb_api_key) this.tmdb_api_key = this.settingsService.settings.api_key;
        return this.http.get(`https://api.themoviedb.org/3/tv/${tv_show_id}?api_key=${this.tmdb_api_key}&language=${this.language}`)
            .map((tv_show_data) => {
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

    getSeasonDetails(tv_show_id: number, season_number: number) {
        if (!this.tmdb_api_key) this.tmdb_api_key = this.settingsService.settings.api_key;
        return this.http.get(`https://api.themoviedb.org/3/tv/${tv_show_id}/season/${season_number}?api_key=${this.tmdb_api_key}&language=${this.language}`)
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

    saveTvShow(tv_show: TvShow) {
        return new Observable(observer => {
            this.electron.ipcRenderer.once('TvShow:save:response', (saved_tv_show: TvShow) => {
                if (tv_show._id) {
                    let idx = this.tv_shows.findIndex((x) => {
                        return x._id === tv_show._id;
                    });
                    this.tv_shows[idx] = new TvShow(saved_tv_show);
                } else {
                    this.tv_shows.push(new TvShow(saved_tv_show));
                }
                this.notificationsService.emit({
                    title: 'Movie saved!',
                    message: `Movie ${saved_tv_show.name} ${(saved_tv_show.name !== saved_tv_show.original_name) ? '<small>' + saved_tv_show.original_name + '</small>' : ''} was saved successfuly!`,
                    severity: 'success'
                });
                observer.next(saved_tv_show);
                observer.complete();
            });
            this.electron.ipcRenderer.send('TvShow:save', tv_show);
        });
    }

    removeTvShow(tv_show: TvShow) {
        this.electron.ipcRenderer.once('TvShow:remove:response', (event, response: TvShow) => {
            if (response) {
                let idx = this.tv_shows.findIndex((x) => {
                    return x._id === response._id;
                });
                this.tv_shows.splice(idx, 1);
                this.notificationsService.emit({
                    title: 'TvShow removed!',
                    message: `TvShow <strong>"${response.name} ${(response.name !== response.original_name) ? '<small>(' + response.original_name + ')</small>' : ''}"</strong> was saved removed!`,
                    severity: 'success'
                });
                this.emmiter.next(this.tv_shows_loaded);
            };
        });
        this.electron.ipcRenderer.send('TvShow:remove', tv_show);
    }
}
