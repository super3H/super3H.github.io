var gulp = require('gulp');

    //Pluginsģ���ȡ
    var minifycss = require('gulp-minify-css');
    var uglify = require('gulp-uglify');
    // ѹ�� public Ŀ¼ css�ļ�
    gulp.task('minify-css', function() {
        return gulp.src('./public/**/*.css')
            .pipe(minifycss())
            .pipe(gulp.dest('./public'));
    });

    // ѹ�� public Ŀ¼ html�ļ�
    gulp.task('minify-html', function() {
      return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
             removeComments: true,
             minifyJS: true,
             minifyCSS: true,
             minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
    });

    // ѹ�� public/js Ŀ¼ js�ļ�
    gulp.task('minify-js', function() {
        return gulp.src('./public/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./public'));
    });



    // ִ�� gulp ����ʱִ�е�����
    gulp.task('default', [
        'minify-css','minify-js'
    ]);