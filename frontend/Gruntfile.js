module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // Task configuration goes here.
    });
  
    // Load plugins here.
    grunt.registerTask('default', ['taskname']);
    // Register tasks here.
  };