module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // Task configuration goes here.
    });
  
    // Load plugins here.
    grunt.registerTask('taskname', 'A sample task that logs some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
      });
    // Register tasks here.
  };