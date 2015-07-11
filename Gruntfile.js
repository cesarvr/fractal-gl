module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.initConfig({
        compass: {
            dev: { 
                options: {
                    sassDir: 'www/sass',
                    cssDir: 'www/stylesheets'
                }
            }
        },
        serve: {
            options: {
                port: 9000,
                'serve': {
                    'path': '.'
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


    grunt.registerTask('default', ['serve', 'watch']);
};
