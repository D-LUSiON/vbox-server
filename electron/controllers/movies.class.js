const Datastore = require('nedb');
const path = require('path');

const env = require('../environment.js');

const Movies = function () {
    const _self = this;

    this.db = null;

    function __construct() {
        _self.db = new Datastore({ filename: path.join(env.user_data, 'movies.db'), autoload: true })
    }

    this.getAll = function (callback) {
        this.db.find({}, (err, movies) => {
            callback.apply(this, [movies]);
        });
        return this;
    }

    this.getByID = function(id, callback){
        this.db.find({ _id: id}, (err, movie) => {
            callback.apply(this, [movies]);
        });
    }

    this.save = function (data, callback) {
        let new_data = JSON.parse(JSON.stringify(data));
        delete new_data._id;
        console.log(data);
        // this.db.update({ _id: data._id }, new_data, {}, (err, rows_updated) => {
        //     callback.apply(this, [data]);
        // });
    }

    this.__insertDefaultSettings = function (callback) {
        const app_settings = require('../app_settings.js');
        this.db.insert(app_settings, (err, settings) => {
            callback.apply(this, [settings]);
        });
    }

    __construct();
};

module.exports = Settings;
