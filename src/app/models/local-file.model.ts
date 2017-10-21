export class LocalFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    path: string;
    size: number;
    type: string;

    constructor(data?) {
        if (data.lastModified) this.lastModified = data.lastModified;
        if (data.lastModifiedDate) this.lastModifiedDate = data.lastModifiedDate;
        if (data.name) this.name = data.name;
        if (data.path) this.path = data.path;
        if (data.size) this.size = data.size;
        if (data.type) this.type = data.type;
    }

    get size_kb() {
        return +(Math.round(this.size / 1024).toFixed(2));
    }

    get size_mb() {
        if (this.size === null)
            return null;

        const size_mb = +((this.size / 1024 / 1024).toFixed(3));
        return size_mb < 1 ? +(size_mb.toFixed(2)) : +(size_mb.toFixed(1));
    }

    get size_gb() {
        if (this.size === null)
            return null;

        const size_gb = +((this.size / 1024 / 1024 / 1024).toFixed(3));
        return size_gb < 1 ? +(size_gb.toFixed(2)) : +(size_gb.toFixed(1));
    }
    get folder() {
        return this.path.replace(this.name, '');
    }

    get video_type() {
        if (this.type)
            return this.type.replace('video/', '');
        else
            return '';
    }
}
