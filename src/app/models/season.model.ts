import { LocalFile } from './local-file.model';
export class Season {
    private image_root = 'http://image.tmdb.org/t/p/w';

    air_date: string = '';
    episode_count: number;
    id: number;
    poster_path: string = '';
    season_number: number;
    files?: LocalFile[] = [];

    constructor(data?) {
        if (data) {
            if (data.air_date !== undefined) this.air_date = data.air_date;
            if (data.episode_count !== undefined) this.episode_count = data.episode_count;
            if (data.id !== undefined) this.id = data.id;
            if (data.poster_path !== undefined) this.poster_path = data.poster_path;
            if (data.season_number !== undefined) this.season_number = data.season_number;
            if (data.files instanceof Array) {
                this.files = data.files.map(file => {
                    return new LocalFile(file);
                });
            }
        }
    }

    get poster() {
        return (this.poster_path) ? this.image_root + '500' + this.poster_path : '';
    }

    set poster(poster_full) {
        this.poster_path = `/${poster_full.split('/').reverse()[0]}`;
    }
}
