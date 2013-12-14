module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    coffee:
      compile:
        files:
          'game.js' : ['source/*.coffee']

    watch:
      coffee:
        files: [
          'source/*.coffee'
        ]
        tasks: ['coffee']

  grunt.registerTask 'default', ['coffee']