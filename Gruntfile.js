module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        
        compass: {
            dev: {
                options: {
                    sassDir: 'www/sass',
                    cssDir: 'www/stylesheets'
                }
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    base: '.',
                    port: 9000
                }
            }
        },

        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "index.html": ["www/jade/*.jade"]
                }
            }
        },

        watch: {
            templates: {
                files: ['www/jade/*.*'],
                tasks: ['jade'],
            },
            sass: {
                files: ['www/sass/*.scss'],
                tasks: ['compass']
            }
        }


    });


    grunt.registerTask('serve', ['connect:server','watch']);
};
