import { Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SettingsService } from './settings.service';
import { NotificationsService } from './notifications.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GenresService {

    private subscription: Subscription;

    private tmtb_api_key: string = '';

    private all_genres: Array<{ [key: string]: any }> = [];

    genres_loaded: boolean = false;

    constructor(
        private http: Http,
        private notificationsService: NotificationsService,
        private settingsService: SettingsService
    ) {
        if (!this.settingsService.settings_loaded) {
            this.subscription = this.settingsService.emmiter.asObservable().subscribe(() => {
                this.tmtb_api_key = this.settingsService.settings.api_key;
                this.subscription.unsubscribe();
                this.subscription = this.getGenres().subscribe((res) => {
                    console.log(res);
                    this.all_genres = res.slice();
                });
            });
        } else {
            let subscription = this.getGenres().subscribe((res) => {
                console.log(res);
                this.all_genres = res.json();
            });
        }
    }

    getGenres() {
        return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.tmtb_api_key}&language=en-US`)
            .map((res) => {
                console.log(res.json());
                return res.json().genres;
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

    get genres() {
        return this.all_genres.slice();
    }

}
