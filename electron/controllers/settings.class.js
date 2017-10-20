const Datastore = require('nedb');
const path = require('path');

const env = require('../environment.js');

const Settings = function () {
    const _self = this;

    this.db = null;

    function __construct() {
        _self.db = new Datastore({ filename: path.join(env.user_data, 'settings.db'), autoload: true })
    }

    this.get = function (callback) {
        this.db.find({}, (err, settings) => {
            if (err)
                console.log(err);
            if (!settings.length)
                this.__insertDefaultSettings((new_settings) => {
                    callback.apply(this, [new_settings]);
                });
            else
                callback.apply(this, [settings]);
        });
        return this;
    }

    this.set = function (data, callback) {
        let new_data = JSON.parse(JSON.stringify(data));
        delete new_data._id;
        this.db.update({ _id: data._id }, new_data, {}, (err, rows_updated) => {
            callback.apply(this, [data]);
        });
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
