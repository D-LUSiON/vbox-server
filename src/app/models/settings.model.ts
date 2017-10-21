export class Settings {
    _id: string = '';
    port: number = 2017;
    movies_folders: string[] = [];
    api_key: string = '';
    language: string = 'bg-BG';

    constructor(data?) {
        if (data._id) this._id = data._id;
        if (data.port) this.port = data.port;
        if (data.movies_folders) this.movies_folders = data.movies_folders;
        if (data.api_key) this.api_key = data.api_key;
        if (data.language) this.language = data.language;
    }
}
