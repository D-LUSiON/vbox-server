const env = require('./environment.js');
const {
    app,
    protocol,
    BrowserWindow,
    ipcRenderer,
    ipcMain,
    Menu,
    MenuItem,
    Tray
} = require('electron');

const path = require('path');
const url = require('url');
const fs = require('fs');

const windowStateKeeper = require('electron-window-state');

let mainWindow;

if (!env.production) {
    require('electron-reload')(
        path.join(__dirname, '..'), {
            ignored: /node_modules|[\/\\]\./,
            electron: path.join(__dirname, '..', 'node_modules', 'electron', 'dist', 'electron.exe')
        }
    );
}

// Create app menu
const appMenu = require('./app-menu');

let mainMenu = Menu.buildFromTemplate(appMenu);

// Create tray icon with functionality
let tray = null
function createTrayIcon() {
    tray = new Tray(path.join(__dirname, '..', 'assets', 'app-icon-m.png'));

    // TODO: Get application title from configuration file
    tray.setToolTip('Electron/Angular 4 quickstart project');

    const trayMenu = Menu.buildFromTemplate([
        {
            label: 'About'
        },
        { role: 'quit' }
    ]);

    tray.setContextMenu(trayMenu);
}

function createWindow() {
    let winState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
    });

    mainWindow = new BrowserWindow({
        width: winState.width,
        height: winState.height,
        x: winState.x,
        y: winState.y,
        resizable: false,
        show: false,
        frame: false,
    });

    winState.manage(mainWindow);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', (env.production ? 'app' : 'build'), 'index.html'),
        protocol: 'file:',
        slashes: true,
        webPreferences: {
            webSecurity: false
        }
    }));

    // if (!env.production) {
    mainWindow.webContents.openDevTools();
    // }

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', () => {
    createWindow();
    Menu.setApplicationMenu(mainMenu);
    createTrayIcon();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});


/**
 *  EXAMPLE MESSAGES:
 *
 *  // Event handler for asynchronous incoming messages
 *  ipcMain.on('asynchronous-message', (event, arg) => {
 *      console.log(arg);
 *
 *      // Event emitter for sending asynchronous messages
 *      event.sender.send('asynchronous-reply', 'async pong')
 *  });
 *
 *  // Event handler for synchronous incoming messages
 *  ipcMain.on('synchronous-message', (event, arg) => {
 *      console.log(arg);
 *
 *      // Synchronous event emmision
 *      event.returnValue = 'sync pong'
 *  });
 *
 */


// Settings interface events
const Settings = require('./controllers/settings.class');

ipcMain.on('Settings:get', (event, arg) => {
    const settings = new Settings().get((data) => {
        event.sender.send('Settings:get:response', data[0]);
    });
});
ipcMain.on('Settings:update', (event, arg) => {
    const settings = new Settings().set(arg, (data) => {
        event.sender.send('Settings:update:response', data);
    });
});

// Files interface events

// Movies interface events
ipcMain.on('Settings:get', (event, arg) => {
    const settings = new Settings().get((data) => {
        event.sender.send('Settings:get:response', data[0]);
    });
});
ipcMain.on('Settings:update', (event, arg) => {
    const settings = new Settings().set(arg, (data) => {
        event.sender.send('Settings:update:response', data);
    });
});

// Collections interface events

// TV Shows interface events