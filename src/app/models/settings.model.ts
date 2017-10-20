export class Settings {
    _id: string = '';
    port: number = 2017;
    movies_folders: string[] = [];
    api_key: string = '';

    constructor(data?) {
        if (data) {
            this._id = data._id;
            this.port = data.port;
            this.movies_folders = data.movies_folders;
            this.api_key = data.api_key;
        }
    }
}
