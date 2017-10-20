const gulp = require('gulp');
const rename_to = require('gulp-rename');
const fs = require('fs');
const path = require('path');

gulp.task('copy_scripts', () => {
    gulp
        .src('./electron/env/environment.prod.js')
        .pipe(rename_to('environment.js'))
        .pipe(gulp.dest('./build'))
        .on('error', (err) => {
            console.log('Error copying electron environment: ', err);
        });

    gulp
        .src(['./electron/**', '!./electron/env', '!./electron/env/**'])
        .pipe(gulp.dest('./build'))
        .on('error', (err) => {
            console.log('Error copying electron scripts: ', err);
        });
});

gulp.task('generate_package', () => {
    const package_json = JSON.parse(fs.readFileSync('./package.json'));
    let package_electron = package_json;

    package_electron.scripts = {
        start: 'electron .'
    };

    package_electron.main = 'main.js';
    package_electron.dependencies = {};
    package_electron.devDependencies = {
        'electron': package_json.devDependencies['electron'],
        'electron-packager': package_json.devDependencies['electron-packager']
    };
    package_electron.files = [
        '*.js',
        'app',
        'build',
        'node_modules'
    ];

    fs.writeFileSync('./build/package.json', JSON.stringify(package_electron, null, 4));
});

gulp.task('package-windows', function (done) {
    const packager = require('electron-packager');

    packager({
        dir: './build',
        overwrite: true,
        platform: 'win32',
        prune: true,
        arch: 'ia32',
        asar: false,
        out: './app'
    }, (appPaths) => {
        console.log(appPaths);
    });
});

gulp.task('create-windows-installer', function (done) {
    const winInstaller = require('electron-windows-installer');
    const package_json = JSON.parse(fs.readFileSync('./package.json'));
    let app_path = ['.', 'app', `${package_json.name}-win32-ia32`];

    if (fs.existsSync(path.resolve(...app_path))) {
        winInstaller({
            appDirectory: app_path.join('/'),
            outputDirectory: './release',
            arch: 'ia32'
        }).then(done).catch(done);
    } else {
        done();
    }
});

gulp.task('setup_electron', ['copy_scripts', 'generate_package']);
