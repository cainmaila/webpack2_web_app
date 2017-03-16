var gulp = require('gulp');
var jsdoc = require('leedian-jsdoc');

gulp.task('doc', function(cb) {
    var config = require('./conf.json');
    gulp.src(['./README.md', './app/*.js', './src/*'], { read: false })
        .pipe(jsdoc(config, cb));
});
