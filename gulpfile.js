// Generated on 2015-05-04 using generator-jekyllized 0.7.3
"use strict";

var gulp = require("gulp");
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require("gulp-load-plugins")();

// BrowserSync isn"t a gulp package, and needs to be loaded manually
var browserSync = require("browser-sync");
// merge is used to merge the output from two different streams into the same stream
var merge = require("merge-stream");
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;
// And define a variable that BrowserSync uses in it"s function
var bs;

var util = require("gulp-util");
var source = require("vinyl-source-stream");
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');

var del = require('del');

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task("jekyll:dev", $.shell.task("bundle exec jekyll build"));
gulp.task("jekyll-rebuild", ["clean:serve", "jekyll:dev", "js"], function() {
  reload;
});

gulp.task("clean:serve", function() {
  return del(['serve/blog/**/*', 'serve/content/**/*']);
});

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don"t end up publishing your drafts or future posts
gulp.task("jekyll:prod", $.shell.task("bundle exec jekyll build --config _config.yml,_config.build.yml"));

// Serve "prod" locally, to check before a final deploy.
gulp.task("jekyll:local-prod", $.shell.task("bundle exec jekyll build --config _config.yml,_config.build.yml,_config.local-build.yml"));

// Compiles the SASS files and moves them into the "assets/stylesheets" directory
gulp.task("styles", function() {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src("src/assets/scss/style.scss")
    .pipe($.sass())
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer("last 1 version", {
      cascade: true
    }))
    // Directory your CSS file goes to
    .pipe(gulp.dest("src/assets/stylesheets/"))
    .pipe(gulp.dest("serve/assets/stylesheets/"))
    .pipe(gulp.dest("site/assets/stylesheets/"))
    // Outputs the size of the CSS file
    .pipe($.size({
      title: "styles"
    }))
    // Injects the CSS changes to your browser since Jekyll doesn"t rebuild the CSS
    .pipe(reload({
      stream: true
    }));
});

gulp.task("js", function() {
  gulp.src('src/assets/javascript/*.js')
    .pipe(gulp.dest('serve/assets/javascript'))
    // .pipe(gulp.dest("site/assets/javascript/"));
});

// Optimizes the images that exists
gulp.task("images", function() {
  return gulp.src("src/images/**/*")
    .pipe($.changed("site/images"))
    .pipe($.imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true
    }))
    .pipe(gulp.dest("site/images"))
    .pipe($.size({
      title: "images"
    }));
});

// Copy over fonts to the "site" directory
gulp.task("fonts", function() {
  return gulp.src("src/assets/fonts/**")
    .pipe(gulp.dest("site/assets/fonts"))
    .pipe($.size({
      title: "fonts"
    }));
});

// Copies favicon to the site folder
gulp.task("copy:favicons", function() {
  return gulp.src("src/assets/favicons/**/*")
    .pipe(gulp.dest("site/assets/favicons"));
});

// Copy bower.
gulp.task("copy:bower", function() {
  return gulp.src(["serve/bower_components/**/*"])
    .pipe(gulp.dest("site/bower_components"))
    .pipe($.size({
      title: "Bower"
    }))
});

// Copy over vendors to the "site" directory
gulp.task("vendors", function() {
  return gulp.src("src/assets/javascript/vendors/**")
    .pipe(gulp.dest("site/assets/javascript/vendors"))
    .pipe($.size({
      title: "vendors"
    }));
});

// Copy xml and txt files to the "site" directory
gulp.task("copy", function() {
  return gulp.src(["serve/*.txt", "serve/*.xml"])
    .pipe(gulp.dest("site"))
    .pipe($.size({
      title: "Copy xml, txt"
    }))
});

gulp.task("cname", function() {
  return gulp.src(["serve/CNAME"])
    .pipe(gulp.dest("site"))
    .pipe($.size({
      title: "CNAME"
    }))
});


// Optimizes all the CSS, HTML and concats the JS et c
gulp.task("html", ["styles"], function() {
  var cssFilter = $.filter('**/*.css', {restore: true});
  var jsFilter = $.filter('**/*.js', {restore: true});
  var htmlFilter = $.filter('**/*.html', {restore: true});

  return gulp.src("serve/**/*.html")
    .pipe($.useref({searchPath: "serve"}))
    // Minify HTML.
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      keepClosingSlash: true
    }))
    .pipe(htmlFilter.restore())
    // Minify CSS.
    .pipe(cssFilter)
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    // Concatenate & Minify JavaScript.
    .pipe(jsFilter)
    .pipe($.uglify({preserveComments: "some"}))
    .pipe(jsFilter.restore())
    // Start cache busting the files
    .pipe($.revAll({
      ignore: [".eot", ".svg", ".ttf", ".woff"]
    }))
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Send the output to the correct folder
    .pipe(gulp.dest("site"))
    .pipe($.size({
      title: "optimizations"
    }));
});


// Task to upload your site to your personal GH Pages repo
gulp.task("deploy", function() {
  // Deploys your optimized site, you can change the settings in the html task if you want to
  return gulp.src("./site/**/*")
    .pipe($.ghPages());
});

// Run JS Lint against your JS
gulp.task("jslint", function() {
  gulp.src("./serve/assets/javascript/*.js")
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint(".jshintrc"))
    .pipe($.jshint.reporter());
});

// Runs "jekyll doctor" on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task("doctor", $.shell.task("bundle exec jekyll doctor"));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task("serve:dev", ["styles", "jekyll:dev", "js"], function() {
  bs = browserSync({
    notify: true,
    open: true,
    // tunnel: "",
    server: {
      baseDir: "serve"
    }
  });
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task("watch", function() {
  gulp.watch([
    "src/**/*.md",
    "src/**/*.html",
    "src/**/*.xml",
    "src/**/*.txt",
    "src/**/*.js"
  ], ["jekyll-rebuild", reload]);
  gulp.watch(["serve/assets/stylesheets/*.css"], reload({
    stream: true
  }));
  gulp.watch(["src/assets/scss/**/*.+(scss|sass)"], ["styles", reload]);
});

// Serve the site after optimizations to see that everything looks fine
gulp.task("serve:prod", ["publish-local"], function() {
  bs = browserSync({
    notify: false,
    // tunnel: true,
    server: {
      baseDir: "site"
    }
  });
});

// Default task, run when just writing "gulp" in the terminal
gulp.task("default", ["serve:dev", "watch"]);


// Builds the site but doesn"t serve it to you
gulp.task("build", ["doctor", "jekyll:prod", "styles", "js"], function() {});

// Builds the "prod" site for local, but doesn"t serve it to you
gulp.task("build-local", ["doctor", "jekyll:local-prod", "styles", "js"], function() {});

// Builds your site with the "build" command and then runs all the optimizations on
// it and outputs it to "./site"
gulp.task("publish", ["build"], function() {
  gulp.start(
    "html",
    "copy",
    "copy:bower",
    "copy:favicons",
    "cname",
    "images",
    "fonts",
    "vendors",
    "js"
  );
});

// Builds your site with the "build" command and then runs all the optimizations on
// it and outputs it to "./site"
gulp.task("publish-local", ["build-local"], function() {
  gulp.start(
    "html",
    "copy",
    "copy:bower",
    "copy:favicons",
    "cname",
    "images",
    "fonts",
    "vendors",
    "js"
  );
});




gulp.task('svgstore', function() {
  return gulp
    .src('src/images/elements/*.svg')
    .pipe(svgmin(function(file) {
      return {
        plugins: [{
          removeTitle: true
        }, {
          cleanupNumericValues: {
            floatPrecision: 1
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest('src/_includes/'));
});
