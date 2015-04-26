module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-serve');

grunt.initConfig({
    serve: {
        options: {
            port: 9000,
             'serve': {
     	   		'path': 'www'
    		}
        }
    }
});

};