import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(
        private electron: ElectronService
    ) { }

    ngOnInit() {
    }

    onMinimizeApp(event) {
        event.preventDefault();
        this.electron.remote.BrowserWindow.getFocusedWindow().minimize();
    }

    onCloseApp(event){
        event.preventDefault();
        this.electron.remote.app.exit();
    }

}
