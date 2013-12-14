module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    coffee:
      compile:
        expand: true
        cwd: 'source/'
        src: ['**/*.coffee']
        dest: 'js/'
        ext: '.js'
        options:
          sourceMap: true

    watch:
      coffee:
        files: [
          'source/*.coffee'
        ]
        tasks: ['coffee']

  grunt.registerTask 'default', ['coffee']