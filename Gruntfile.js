// https://www.coursera.org/learn/angular-js/supplement/63KTw/exercise-instructions-web-tools-grunt
'use strict';
module.exports = function(grunt) {
  // time how long tasks take.  can help to optimize build times
  require('time-grunt')(grunt);

  //automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // define the configuration for all tasks
  grunt.initConfig({
    pkg:  grunt.file.readJSON('package.json'),
    // make sure code styles are correct and no obvious mistakes
    jshint: {
      options: {
        jshintrc:  '.jshintrc',
        reporter:  require('jshint-stylish')
      },
      all:  {
        src: [
          'Gruntfile.js',
          'src/scripts/{,*/}*.js'
        ]
      }
    },
    copy: {
      dist: {
        cwd: 'src',
        src: ['**', '!styles/**/*.css', '!scripts/**/*.js'],
        dest: 'dist',
        expand: true
      },
      fonts: {
        files: [
          {
            // for bootstrap fonts
            expand: true,
            dot:  true,
            cwd: 'bower_components/bootstrap/dist',
            src: ['fonts/*.*'],
            dest: 'dist'
          }, {
            // for font-awesome
            expand: true,
            dot: true,
            cwd: 'bower_components/font-awesome',
            src: ['fonts/*.*'],
            dest: 'dist'
          }
        ]
      }
    },
    clean: {
      build: {
        src: ['dist/']
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist'
      }
    },

    concat:  {
      options: {
        separator: ';'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    uglify: {
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    cssmin: {
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      release: {
        // filerev  hashes (md5) all assets (images, js, and css)
        // in the dist directory
        files: [{
          src: [
            'dist/scripts/*.js',
            'dist/styles/*.css'
          ]
        }]
      }
    },
    // usemin replaces all assets with their revved version in html
    // and css files.  options.assetDirs contains the directories
    // for finding the assets according to their relative paths
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/*.css'],
      options: {
        assetDirs:  ['dist', 'dist/styles']
      }
    },
    watch: {
      copy: {
        files: ['src/**', '!src/**/*.css', '!src/**/*.js'],
        tasks: ['build']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['build']
      },
      styles: {
        files: ['src/styles/styles.css'],
        tasks: ['build']
      },
      livereload:  {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'src/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'src/images/{,*/}*.{png,jpg,gif,jpeg,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 8000,
        // change this to 0.0.0.0 to access the server from outside
        hostname:  'localhost',
        livereload: 35729
      },
      dist: {
        options: {
          open: true,
          base: {
            path: 'dist',
            options: {
              index: 'index_md.html',
              maxAge: 300000
            }
          }
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'dist',
        branch: 'master'
      },
      src: ['**']
    }
  });

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('dev', ['gh-pages']);
  grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);
  grunt.registerTask('default', ['build']);
};
