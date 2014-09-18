module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'assets/css/*'
                ],
                dest: 'dist/css/pinecode.css'
            },
            js: {
                src: [
                    'assets/js/*'
                ],
                dest: 'dist/js/pinecode.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/css/pinecode.css',
                dest: 'dist/css/pinecode.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/js/pinecode.js': ['dist/js/pinecode.js']
                }
            }
        },
        copy: {
            main: {
                src: 'assets/img/*',
                dest: 'dist/img/',
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};
