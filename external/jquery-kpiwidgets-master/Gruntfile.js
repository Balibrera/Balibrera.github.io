/**
 * Created by guybenshoshan on 2/26/15.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            minify: {
                options: {
                    sourceMap: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        src: '**/*.js',
                        dest: 'dist/js',
                        ext: '.min.js'
                    }
                ]
            }
        },

        cssmin: {
            minify: {
                options: {
                    sourceMap: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: '**/*.css',
                        dest: 'dist/css',
                        ext: '.min.css'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};
