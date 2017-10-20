export class Movie {
    _id: string;
    title: string = '';
    year?: number | string = '';
    poster: string = '';

    constructor(data?) {
        if (data) {
            this._id = data._id;
            this.title = data.title;
            this.poster = data.poster;
            if (data.year) this.year = data.year;
            this.poster = data.poster;
        }
    }
}
