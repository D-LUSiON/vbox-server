export class Movie {
    private image_root = 'http://image.tmdb.org/t/p/w';

    _id: string;
    title: string = '';

    id: number;
    poster: string = '';
    original_title: string = '';
    overview: string = '';
    backdrop_image: string = '';
    genre_ids: Array<number> = [];
    genres: Array<any> = [];
    movie_files: Array<any> = [];
    original_language: string = 'en';
    popularity: number = 0;
    release_date: string = ''; // YYYY-mm-dd
    video: boolean = false;
    vote_average: number = 0;
    vote_count: number = 0;

    constructor(data?) {
        if (data) {
            if (data._id)               this._id = data._id;
            if (data.id)                this.id = data.id;
            if (data.title)             this.title = data.title;
            if (data.poster_path)       this.poster = this.image_root + '500' + data.poster_path;
            if (data.poster)            this.poster = data.poster;
            if (data.backdrop_image)    this.backdrop_image = data.backdrop_image;
            if (data.backdrop_path)     this.backdrop_image = this.image_root + '1280' + data.backdrop_path;
            if (data.original_title)    this.original_title = data.original_title;
            if (data.overview)          this.overview = data.overview;
            if (data.genre_ids)         this.genre_ids = data.genre_ids;
            if (data.genres)            this.genres = data.genres;
            if (data.movie_files)       this.movie_files = data.movie_files;
            if (data.original_language) this.original_language = data.original_language;
            if (data.popularity)        this.popularity = data.popularity;
            if (data.release_date)      this.release_date = data.release_date;
            if (data.video)             this.video = data.video;
            if (data.vote_average)      this.vote_average = data.vote_average;
            if (data.vote_count)        this.vote_count = data.vote_count;
        }
    }
}
