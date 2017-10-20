export class TMDBMovie {
    private image_root = 'http://image.tmdb.org/t/p/w';
    poster_width_sm = 150;
    poster_width_lg = 303;
    backdrop_width_sm = 640;
    backdrop_width_lg = 800;
    backdrop_width_xl = 1920;
    poster_sm = `${this.image_root}${this.poster_width_sm}`;
    poster_lg = `${this.image_root}${this.poster_width_lg}`;
    backdrop_sm = `${this.image_root}${this.poster_width_sm}`;
    backdrop_lg = `${this.image_root}${this.poster_width_lg}`;

    // TMDB
    adult: boolean;
    backdrop_path: string = '';
    genre_ids: Array<number> = [];
    id: number;
    original_language: string = 'en';
    original_title: string = '';
    overview: string = '';
    popularity: number = 0;
    poster_path: string = '';
    release_date: string = ''; // YYYY-mm-dd
    title: string = '';
    video: boolean = false;
    vote_average: number = 0;
    vote_count: number = 0;

    constructor(data?) {
        if (data) {
            this.adult = data.adult;
            this.backdrop_path = data.backdrop_path;
            this.genre_ids = data.genre_ids;
            this.id = data.id;
            this.original_language = data.original_language;
            this.original_title = data.original_title;
            this.overview = data.overview;
            this.popularity = data.popularity;
            this.poster_path = data.poster_path;
            this.release_date = data.release_date;
            this.title = data.title;
            this.video = data.video;
            this.vote_average = data.vote_average;
            this.vote_count = data.vote_count;

            this.poster_sm = `${this.image_root}${this.poster_width_sm}${this.poster_path}`;
            this.poster_lg = `${this.image_root}${this.poster_width_lg}${this.poster_path}`;
            this.backdrop_sm = `${this.image_root}${this.poster_width_sm}${this.poster_path}`;
            this.backdrop_lg = `${this.image_root}${this.poster_width_lg}${this.poster_path}`;
        }
    }
}
