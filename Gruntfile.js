module.exports = function(grunt) {
  // requires
  grunt.loadNpmTasks('grunt-gh-pages');
  // grunt task configurations
  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    copy: {
      dist: {
        cwd: 'src',
        src: ['**', '!**/*.css', '!**/*.js'],
        dest: 'dist',
        expand: true
      }
    },
    clean: {
      build: {
        src: ['dist']
      }
    },
    filerev: {
      options: {
        encoding: 'utf8', algorithm: 'md5', length: 20
      },
      release: {
        files: [{
          src: ['dist/scripts/*.js', 'dist/styles/*.css']
        }]
      }
    }
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/*.css'];
      options: {
        assetsDirs: ['dist', 'dist/styles'];
      }
    }



  });

  // grant task registrations
  grunt.registerTask('build', ['clean', 'copy', 'gh-pages']);
  grunt.registerTask('default', ['build'])
}
