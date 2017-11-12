import { Season } from './season.model';
export class TvShow {
    private image_root = 'http://image.tmdb.org/t/p/w';

    _id: string;
    backdrop_path: string = '';
    created_by: Array<{
        gender: number,
        id: number,
        name: string,
        profile_path: string
    }> = [];
    episode_run_time: Array<number> = [];
    first_air_date: string = '';
    genre_ids: Array<number> = [];
    genres: Array<{ id: number, name: string }> = [];
    homepage: string = '';
    id: number;
    in_production: boolean = false;
    languages: Array<string> = [];
    last_air_date: '2017-08-25';
    movie_files: Array<any> = [];
    name: string = '';
    networks: Array<{ id: number, name: string }> = [];
    number_of_episodes: number = 0;
    number_of_seasons: number = 0;
    origin_country: Array<string> = [];
    original_language: string = 'en';
    original_name: string = '';
    overview: string = '';
    popularity: number = 0;
    poster_path: string = '';
    production_companies: Array<{ id: number, name: string }> = [];
    season_details?: Array<any> = [];
    seasons: Season[] = [];
    status: string = '';
    type: string = 'Scripted';
    vote_average: number = 0;
    vote_count: number = 0;



    constructor(data?) {
        if (data) {
            if (data._id !== undefined) this._id = data._id;
            if (data.backdrop_image !== undefined) this.backdrop_image = data.backdrop_image; // check that if it's correct
            if (data.backdrop_path !== undefined) this.backdrop_image = this.image_root + '1280' + data.backdrop_path;
            if (data.created_by !== undefined) this.created_by = data.created_by;
            if (data.episode_run_time !== undefined) this.episode_run_time = data.episode_run_time;
            if (data.first_air_date !== undefined) this.first_air_date = data.first_air_date;
            if (data.genre_ids !== undefined) this.genre_ids = data.genre_ids;
            if (data.genres !== undefined) this.genres = data.genres;
            if (data.homepage !== undefined) this.homepage = data.homepage;
            if (data.id !== undefined) this.id = data.id;
            if (data.in_production !== undefined) this.in_production = data.in_production;
            if (data.languages !== undefined) this.languages = data.languages;
            if (data.last_air_date !== undefined) this.last_air_date = data.last_air_date;
            if (data.movie_files !== undefined) this.movie_files = data.movie_files;
            if (data.name !== undefined) this.name = data.name;
            if (data.networks !== undefined) this.networks = data.networks;
            if (data.number_of_episodes !== undefined) this.number_of_episodes = data.number_of_episodes;
            if (data.number_of_seasons !== undefined) this.number_of_seasons = data.number_of_seasons;
            if (data.origin_country !== undefined) this.origin_country = data.origin_country;
            if (data.original_language !== undefined) this.original_language = data.original_language;
            if (data.original_name !== undefined) this.original_name = data.original_name;
            if (data.overview !== undefined) this.overview = data.overview;
            if (data.popularity !== undefined) this.popularity = data.popularity;
            if (data.poster_path !== undefined) this.poster = this.image_root + '500' + data.poster_path;
            if (data.poster !== undefined) this.poster = data.poster; // check that if it's correct
            if (data.production_companies !== undefined) this.production_companies = data.production_companies;
            if (data.season_details !== undefined) this.season_details = data.season_details;
            if (data.seasons instanceof Array) {
                this.seasons = data.seasons.map(season => {
                    return new Season(season);
                });
            };
            if (data.status !== undefined) this.status = data.status;
            if (data.type !== undefined) this.type = data.type;
            if (data.vote_average !== undefined) this.vote_average = data.vote_average;
            if (data.vote_count !== undefined) this.vote_count = data.vote_count;
        }
    }

    get poster() {
        return (this.poster_path) ? this.image_root + '500' + this.poster_path : '';
    }

    set poster(poster_full) {
        this.poster_path = `/${poster_full.split('/').reverse()[0]}`;
    }

    get backdrop_image() {
        return (this.backdrop_path) ? this.image_root + '1280' + this.backdrop_path : '';
    }

    set backdrop_image(backdrop_full) {
        this.backdrop_path = `/${backdrop_full.split('/').reverse()[0]}`;
    }
}
