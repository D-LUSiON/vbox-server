const { app } = require('electron');

module.exports = environment = {
    production: false,
    user_data: app.getPath('userData')
};
