module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'dist/**/*.js', 'test/**/*.js']
    },
    copy: {
      build: {
        cwd: 'src',
        src:  ['**'],
        dest: 'dist',
        expand: true
      }
    },
    clean: {
      build: {
        src: ['dist']
      },
      stylesheets: {
        src: ['dist/**/*.css', '!dist/application.css']
      },
      scripts: {
        src: ['dist/**/*.js', '!dist/application.js']
      }
    },
    cssmin: {
      build: {
        files: {
          'dist/application.css': ['dist/**/*.css']
        }
      }
    },
    uglify: {
      build: {
        options: {
          mangle: false
        },
        files:  {
          'dist/application.js': ['dist/**/*.js']
        }
      }
    },
    watch: {
    
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('build', ['clean:build', 'copy', 'stylesheets', 'scripts']);
  grunt.registerTask('stylesheets', ['cssmin']);
  grunt.registerTask('scripts', ['uglify']);


};
