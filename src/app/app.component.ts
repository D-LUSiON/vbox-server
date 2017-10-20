import { Component, NgZone, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { NotificationsService } from '@app/services';
import { Notification } from '@app/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    all_backgrounds = [
        'assets/wallpapers/721360.jpg',
        'assets/wallpapers/809002.jpg',
        'assets/wallpapers/5539134-the-hobbit-movie-wallpapers.jpg',
        'assets/wallpapers/6987567-oblivion-movie.jpg',
        'assets/wallpapers/62848741-movie-wallpapers.jpg',
        'assets/wallpapers/awesome-movie-wallpapers-1.jpg',
        'assets/wallpapers/ba657082dc4b16282ae972a62e128eb0.jpg',
        'assets/wallpapers/Chappie_Movie_UHD.jpg',
        'assets/wallpapers/d451a2ac313fb99e561e64efcbfc2250.jpg',
        'assets/wallpapers/da17fcf285d2f16ff20c07087fd96628.jpg',
        'assets/wallpapers/darth_vader_armor_star_wars_film_hat_snow_93645_1920x1080.jpg',
        'assets/wallpapers/doctor-strange-2016-movie-fanart-2K-wallpaper.jpg',
        'assets/wallpapers/elysium_movie-wide.jpg',
        'assets/wallpapers/interstellar_movie-wide.jpg',
        'assets/wallpapers/justice_league_2017_movie-wide.jpg',
        'assets/wallpapers/marvel_deadpool_movie-wide.jpg',
        'assets/wallpapers/movie-wallpapers-1.jpg',
        'assets/wallpapers/pirates_of_the_caribbean_movie-HD.jpg',
        'assets/wallpapers/Sucker-Punch-Movie.jpg',
        'assets/wallpapers/thumb-1920-669112.jpg',
        'assets/wallpapers/wallpaper.wiki-The-Hobbit-Movie-Wallpaper-HD-1080p-PIC-WPE0014522.jpg',
        'assets/wallpapers/142640.jpg'
    ];

    background = '';

    constructor(
        private electron: ElectronService,
        private notificationsService: NotificationsService,
        private ngZone: NgZone,
        private toastyService:ToastyService, private toastyConfig: ToastyConfig
    ) {
        this.setBackground();
        setTimeout(() => {
            this.setBackground();
        }, 60 * 1000);

        this.notificationsService.listener().subscribe((message: Notification) => {
            let toast_message = {
                title: message.title,
                msg: message.message,
                showClose: true,
                timeout: 5000,
                theme: 'default',
            };

            switch (message.severity) {
                case 'default': this.toastyService.default(toast_message); break;
                case 'info': this.toastyService.info(toast_message); break;
                case 'success': this.toastyService.success(toast_message); break;
                case 'wait': this.toastyService.wait(toast_message); break;
                case 'error': this.toastyService.error(toast_message); break;
                case 'warning': this.toastyService.warning(toast_message); break;
            }
        });
    }

    setBackground() {
        let idx = Math.floor(Math.random() * (this.all_backgrounds.length - 1 - 0 + 1)) + 0;
        this.background = `url("${this.all_backgrounds[idx]}")`;
    }

    ngOnInit() {
        // Async message handler
        this.electron.ipcRenderer.on('asynchronous-reply', (event, response) => {
            // use NgZone to execute code after response, otherwise the view will not be updated
            this.ngZone.run(() => {

            });
        });
    }
}
