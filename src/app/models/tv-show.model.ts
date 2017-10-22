export class TvShow {
    private image_root = 'http://image.tmdb.org/t/p/w';

    _id: string;
    name: string = '';

    id: number;
    poster: string = '';
    original_name: string = '';
    overview: string = '';
    backdrop_image: string = '';
    genre_ids: Array<number> = [];
    genres: Array<any> = [];
    movie_files: Array<any> = [];
    original_language: string = 'en';
    popularity: number = 0;
    first_air_date: string = ''; // YYYY-mm-dd
    vote_average: number = 0;
    vote_count: number = 0;
    seasons? = [];

    constructor(data?) {
        if (data) {
            if (data._id)               this._id = data._id;
            if (data.id)                this.id = data.id;
            if (data.name)              this.name = data.name;
            if (data.poster_path)       this.poster = this.image_root + '500' + data.poster_path;
            if (data.poster)            this.poster = data.poster;
            if (data.backdrop_image)    this.backdrop_image = data.backdrop_image;
            if (data.backdrop_path)     this.backdrop_image = this.image_root + '1280' + data.backdrop_path;
            if (data.original_name)     this.original_name = data.original_name;
            if (data.overview)          this.overview = data.overview;
            if (data.genre_ids)         this.genre_ids = data.genre_ids;
            if (data.genres)            this.genres = data.genres;
            if (data.movie_files)       this.movie_files = data.movie_files;
            if (data.original_language) this.original_language = data.original_language;
            if (data.popularity)        this.popularity = data.popularity;
            if (data.first_air_date)    this.first_air_date = data.first_air_date;
            if (data.vote_average)      this.vote_average = data.vote_average;
            if (data.vote_count)        this.vote_count = data.vote_count;
            if (data.seasons)           this.seasons = data.seasons;
        }
    }
}
