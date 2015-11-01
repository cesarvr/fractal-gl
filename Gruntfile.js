module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'build/app.js': ['js/**/*.js', 'node_modules/underscore/underscore-min.js'],
                },
                options: {
                    transform: ["node-underscorify"]
                },
            },
        },

        jst: {
            compile: {
                options: {
                    templateSettings: {
                        interpolate: /\{\{(.+?)\}\}/g
                    }
                },
                files: {
                    "js/template/templates.js": ["templates/**/*.html"]
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/**/*.js', '**/*.html'],
                tasks: ['browserify', 'jst'],
                options: {
                    spawn: false,
                },
            },
        },

    });

    grunt.registerTask('default', ['browserify', 'jst', 'watch']);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');

}
