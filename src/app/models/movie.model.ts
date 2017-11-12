export class Movie {
    private image_root = 'http://image.tmdb.org/t/p/w';

    _id: string;
    adult: boolean = false;
    backdrop_path: string = '';
    belongs_to_collection: { backdrop_path: string, id: number, name: string, poster_path: string };
    budget: number;
    genre_ids: Array<number> = [];
    genres: Array<{ id: number, name: string }> = [];
    homepage: string = '';
    id: number;
    imdb_id: string = '';
    movie_files: Array<any> = [];
    original_language: string = 'en';
    original_title: string = '';
    overview: string = '';
    popularity: number = 0;
    poster_path: string = '';
    production_companies: Array<{ id: number, name: string }> = [];
    production_countries: Array<{ iso_3166_1: string, name: string }> = [];
    release_date: string = ''; // YYYY-mm-dd
    revenue: number;
    runtime: number;
    spoken_languages: Array<{ iso_639_1: string, name: string }> = [];
    status: string;
    tagline: string;
    title: string = '';
    video: boolean = false;
    vote_average: number = 0;
    vote_count: number = 0;

    constructor(data?) {
        if (data) {
            if (data._id) this._id = data._id;
            if (data.id) this.id = data.id;
            if (data.title) this.title = data.title;
            if (data.poster_path) this.poster_path = data.poster_path;
            if (data.poster) this.poster = data.poster; // check that if it's correct
            if (data.backdrop_image) this.backdrop_image = data.backdrop_image; // check that if it's correct
            if (data.backdrop_path) this.backdrop_image = this.image_root + '1280' + data.backdrop_path;
            if (data.original_title) this.original_title = data.original_title;
            if (data.overview) this.overview = data.overview;
            if (data.genre_ids) this.genre_ids = data.genre_ids;
            if (data.genres) this.genres = data.genres;
            if (data.movie_files) this.movie_files = data.movie_files;
            if (data.original_language) this.original_language = data.original_language;
            if (data.popularity) this.popularity = data.popularity;
            if (data.release_date) this.release_date = data.release_date;
            if (data.video) this.video = data.video;
            if (data.vote_average) this.vote_average = data.vote_average;
            if (data.vote_count) this.vote_count = data.vote_count;

            if (data.adult) this.adult = data.adult;
            if (data.backdrop_path) this.backdrop_path = data.backdrop_path;
            if (data.belongs_to_collection) this.belongs_to_collection = data.belongs_to_collection;
            if (data.budget) this.budget = data.budget;
            if (data.genres) this.genres = data.genres;
            if (data.homepage) this.homepage = data.homepage;
            if (data.imdb_id) this.imdb_id = data.imdb_id;
            if (data.poster_path) this.poster_path = data.poster_path;
            if (data.production_companies) this.production_companies = data.production_companies;
            if (data.production_countries) this.production_countries = data.production_countries;
            if (data.revenue) this.revenue = data.revenue;
            if (data.runtime) this.runtime = data.runtime;
            if (data.spoken_languages) this.spoken_languages = data.spoken_languages;
            if (data.status) this.status = data.status;
            if (data.tagline) this.tagline = data.tagline;
        }
    }

    get poster() {
        return (this.poster_path)? this.image_root + '500' + this.poster_path : '';
    }

    set poster(poster_full) {
        this.poster_path = `/${poster_full.split('/').reverse()[0]}`;
    }

    get backdrop_image() {
        return (this.backdrop_path)? this.image_root + '1280' + this.backdrop_path : '';
    }

    set backdrop_image(backdrop_full) {
        this.backdrop_path = `/${backdrop_full.split('/').reverse()[0]}`;
    }
}
