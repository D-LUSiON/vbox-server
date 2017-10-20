const { app } = require('electron');

module.exports = environment = {
    production: true,
    user_data: app.getPath('userData')
};
