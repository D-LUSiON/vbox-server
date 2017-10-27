const path = require('path');

const env = require('../environment.js');

const TvShows = function (Datastore) {
    const _self = this;

    this.db = null;

    function __construct() {
        _self.db = new Datastore({ filename: path.join(env.user_data, 'tv-shows.db'), autoload: true })
    }

    this.getAll = function (callback) {
        this.db.find({}, (err, tv_shows) => {
            if (err)
                console.log(err);

            callback.apply(this, [tv_shows]);
        });
        return this;
    }

    this.getByID = function (id, callback) {
        this.db.find({ _id: id }, (err, movie) => {
            callback.apply(this, [movie]);
        });
        return this;
    }

    this.save = function (data, callback) {
        let new_data = JSON.parse(JSON.stringify(data));
        delete new_data._id;

        if (data._id) {
            this.db.update({ _id: data._id }, new_data, {}, (err, rows_updated) => {
                callback.apply(this, [data]);
            });
        } else {
            this.db.insert(new_data, (err, new_tv_show) => {
                callback.apply(this, [new_tv_show]);
            });
        }
        return this;
    }

    this.remove = function(data, callback) {
        if (data._id) {
            this.db.remove({ _id: data._id }, (err, deleted_rows) => {
                if (deleted_rows > 0)
                    callback.apply(this, [data]);
                else
                    callback.apply(this, []);
            });
        } else {
            callback.apply(this, []);
        }
        return this;
    }

    __construct();
};

module.exports = TvShows;
