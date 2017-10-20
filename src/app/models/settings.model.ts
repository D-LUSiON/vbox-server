export class Settings {
    _id: string = '';
    port: number = 2017;
    movies_folders: string[] = [];

    constructor(data?) {
        if (data) {
            this._id = data._id;
            this.port = data.port;
            this.movies_folders = data.movies_folders;
        }
    }
}
