var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');

function buildJs(){
	console.log('Rebuilding JS...');
	return gulp.src('script.js')
		.pipe(browserify({
			transform: ['debowerify', 'babelify'],
			insertGlobals : true,
			ignore: 'node_modules'
		}))
		.pipe(gulp.dest('./build/js'));
}

function buildHtml(){
	console.log('Rebuilding HTML...');
	return gulp.src('index.html')
		.pipe(gulp.dest('./build'));
}

function buildCss(){
	console.log('Rebuilding CSS...');
	return gulp.src('styles.css')
		.pipe(gulp.dest('./build/css'));
}

gulp.task('javascript', function() {
	buildJs();
});

gulp.task('html', function() {
	buildHtml();
});

gulp.task('css', function() {
	buildCss();
});


gulp.task('connect', function () {
  connect.server({
    root: ['./build'],
    livereload: true
  });
});

gulp.task('watch', function () {
	gulp.watch(['script.js', 'bower_components/**/*.js'], function(){
		buildJs().pipe(connect.reload());
	});
	gulp.watch(['styles.css'], function(){
		buildCss().pipe(connect.reload());
	});
	gulp.watch(['index.html'], function() {
		buildHtml().pipe(connect.reload());
	});
});

gulp.task('default', ['javascript', 'html', 'css', 'connect', 'watch']);
