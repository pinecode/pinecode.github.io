module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    [
                        'assets/css/bootstrap.min.css',
                        'assets/css/monokai.css',
                        'assets/css/main.css'
                    ]
                ],
                dest: 'dist/css/pinecode.css'
            },
            js: {
                options: {
                    separator: ';',
                },
                src: [
                    [
                        'assets/js/jquery-1.11.0.js',
                        'assets/js/*.js',
                        'assets/js/contact.js',
                        'assets/js/pinecode.js'
                    ]
                ],
                dest: 'dist/js/pinecode.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/css/pinecode.css',
                dest: 'dist/css/pinecode.css'
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
            images: {
                cwd: 'assets/img/',
                src: '**/*',
                dest: 'dist/img/',
                expand: true
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'copy:images']);
};
