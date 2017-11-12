const path = require('path');

const env = require('../environment.js');

const Video = function(Datastore) {

    const _self = this;

    this.movies_db = null;
    this.tv_shows_db = null;

    function __construct() {
        _self.movies_db = new Datastore({ filename: path.join(env.user_data, 'movies.db'), autoload: true });
        _self.tv_shows_db = new Datastore({ filename: path.join(env.user_data, 'tv-shows.db'), autoload: true });
    }

    this.getByID = function(id, callback) {
        console.log('Searching for', id);
        this.movies_db.find({ '_id': id }, (err, movie) => {
            if (movie)
                callback.apply(_self, [movie]);
            else
                _self.tv_shows_db.find({ '_id': id }, (err, tv_show) => {
                    callback.apply(_self, [tv_show]);
                });
        });
    };

    __construct();
};

module.exports = Video;