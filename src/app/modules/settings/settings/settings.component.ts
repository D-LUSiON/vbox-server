import { Component, NgZone, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import { SettingsService } from '@app/services';
import { Settings } from '@app/models';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    settings_data: FormGroup;

    settings: Settings;

    constructor(
        private settingsService: SettingsService,
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        this.settings = this.settingsService.settings;
        this.settings_data = new FormGroup({
            '_id': new FormControl(this.settings._id),
            'port': new FormControl(this.settings.port),
            'movies_folders': new FormControl(this.settings.movies_folders),
            'api_key': new FormControl(this.settings.api_key)
        });
    }

    onFolderSelected(event) {
        let new_path = event.target.files[0].path,
            roots = this.settings_data.value['movies_folders'] || [];

        if (roots.indexOf(new_path) === -1)
            roots.push(new_path);

        this.ngZone.run(() => {
            this.settings_data.patchValue({
                'movies_folders': roots
            });
        });
    }

    removePath(path) {
        let roots = this.settings_data.value['movies_folders'] || [],
            idx = roots.indexOf(path);

        roots.splice(idx, 1);

        this.settings_data.patchValue({
            'movies_folders': roots
        });
    }

    onSubmit() {
        this.settingsService.settings = this.settings_data.value;
    }

}
