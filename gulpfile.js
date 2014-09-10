var gulp     = require('gulp');
var jshint   = require('gulp-jshint');
var mocha    = require('gulp-mocha');

var bell = function () {
	console.log('\u0007');
};

var bailOnFail = false;
gulp.task('lint', function () {
	var stream = gulp.src(['src/**/*.js', 'specs/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.on('error', bell);
	if (bailOnFail) {
		stream = stream.pipe(jshint.reporter('fail'));
	}
	return stream;
});

gulp.task('test', ['lint'], function () {
	return gulp.src('specs/**/*.js', { read: false })
		.pipe(mocha({ reporter: 'dot', useColors: false, bail: bailOnFail }))
		.on('error', bell)
		.on('error', function () {
			if (!bailOnFail) { this.emit('end'); }
		});
});

gulp.task('watch', ['test'], function () {
	gulp.watch(['src/**/*.js', 'specs/**/*.js'], ['test']);
});

gulp.task('default', function () {
	bailOnFail = true;
	gulp.start(['test']);
});
