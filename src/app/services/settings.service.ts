import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ElectronService } from 'ngx-electron';
import { Settings } from '@app/models';
import { NotificationsService } from './notifications.service';

@Injectable()
export class SettingsService {

    server_settings: Settings;

    settings_loaded: boolean;

    emmiter: Subject<any> = new Subject();

    constructor(
        private electron: ElectronService,
        private notificationsService: NotificationsService,
        private ngZone: NgZone,
    ) {
        this.electron.ipcRenderer.on('Settings:update:response', (event, response) => {
            this.ngZone.run(() => {
                this.server_settings = new Settings(response);
                this.notificationsService.emit({
                    title: 'Settings saved',
                    message: 'Settings successfuly saved!',
                    severity: 'success',
                    data: response
                });
            });
        });
    }

    private getSettings(callback?) {
        this.electron.ipcRenderer.on('Settings:get:response', (event, response) => {
            this.server_settings = new Settings(response);
            this.settings_loaded = true;
            this.emmiter.next(this.settings_loaded);
            if (callback)
                callback.apply(this, [this.server_settings]);
        });
        this.electron.ipcRenderer.send('Settings:get');
    }

    resolve(): Observable<any> | boolean {
        if (this.settings_loaded)
            return true;

        return new Observable(observer => {
            this.getSettings((data) => {
                observer.next(true);
                observer.complete();
            });
        });
    }

    get settings() {
        return new Settings(this.server_settings);
    }

    set settings(settings_data) {
        this.server_settings = new Settings(settings_data);
        this.electron.ipcRenderer.send('Settings:update', this.server_settings);
    }

}
