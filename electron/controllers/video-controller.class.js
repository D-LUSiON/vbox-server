const path = require('path');
const fs = require('fs');
const express = require('express');

const env = require('../environment.js');

const Settings = require('./settings.class');

const VideoController = function(Datastore) {

    this.server = null;

    this.port = null;

    this.__construct = () => {
        const settings = new Settings(Datastore);

        settings.get(s => {
            this.port = s[0].port;

            this._initExpress();
        });
    }


    this._initExpress = () => {
        this.server = express();

        this.server.get('/tv-show', (req, res) => {
            const video_id = req.query.watch;

            this._findVideo('tv-shows', video_id, (tv_show) => {
                if (tv_show) {
                    const season = req.query.s;
                    const episode = req.query.e;
                    const season_idx = (tv_show.seasons[0] || {}).season_number === 0 ? season : season - 1;

                    this._streamVideo(req, res, tv_show.seasons[season_idx].files[episode - 1]);
                } else {
                    console.log(`Requested TV Show with ID# ${video_id}, Season #${req.query.s}, Episode #${req.query.e}, but nothing is found...`);
                    res.send('');
                    res.end();
                }
            });
        });

        this.server.get('/movie', (req, res) => {
            const video_id = req.query.watch;

            this._findVideo('movies', video_id, movie => {
                if (movie) {

                } else {
                    res.send('');
                    res.end();
                }
            });
        });

        this.server.listen(this.port || 2017, () => {
            console.log('Video server is listening on port %s', (this.port || 2017));
        });
    }

    this._findVideo = (type, id, callback) => {
        const database = new Datastore({ filename: path.join(env.user_data, `${type}.db`), autoload: true });

        database.find({ '_id': id }, (err, result) => {
            if (result && result.length > 0)
                callback.apply(this, [result[0]]);
            else
                callback.apply(this, []);
        });
    };

    this._streamVideo = (req, res, video_data) => {
        const video_path = path.normalize(video_data.path);
        const stat = fs.statSync(video_path);
        const file_size = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : file_size - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(video_path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${file_size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': file_size,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(video_path).pipe(res);
        }
    };

    this.__construct();
};

module.exports = VideoController;