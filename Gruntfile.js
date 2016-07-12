module.exports = function(grunt) {
	
	// Project configuration
	grunt.initConfig({
		connect: {
			options: {
				port:9000,
				hostname:'localhost',
				livereload:35731
			}
		},
		pkg: grunt.file.readJSON('package.json'),
        // Concatenate all the JavaScript files
		concat: {
			files: {
				//src: ['app/src/scripts/routes/**/*.js', 'app/src/scripts/controllers/**/*.js', 'app/src/scripts/services/**/*.js', 'app/src/scripts/directives/*.js', 'app/src/scripts/environment_config/config.js'],
				//dest: 'app/src/scripts/concatenated/app_angular_code.js'
			}
		},
        // Minify the concatenated files
		uglify: {
			options: {
				report: 'min',
				mangle: false
			},
			files: {
				//src: 'app/src/scripts/concatenated/app_angular_code.js',
				//dest: 'app/build/scripts/js/app_angular_code.min.js'
			}
		},
        // Check for syntax errors in all the JavaScript files
		jshint: {
			all: ['client/**/*.js', '!client/bower_components/**'],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				laxbreak: true,
				laxcomma: true,
				globals: {
					jQuery: true,
					angular: true
				}
			}
		},
        // Compile scss files into css
		sass: {
			dist: {
				options: {
					sourceMap: true,
					style: 'compressed'
				},
				files: {
					'client/stylesheets/style.css': 'client/stylesheets/sass/style.scss'
				}
			}
		},

        /* Connect to localhost:3000
		connect: {
			server: {
				options: {
					open: true,
					base: '.',
					livereload: true
				}
			},
			misc: {
				options: {
					open: true,
					livereload: true
				}
			}
		},*/
        // Watch for changes made in the files below and run the assigned task
		watch: {
			options: {
				livereload: 35731,
			},
			js: {
				files: ['client/**/*.js','!client/bower_components/**'],                                         // Files to watch
				tasks: ['jshint'],      // Tasks to run when watched files change
				event: 'all'
			},
			css: {
				files: ['client/stylesheets/**/*.scss'],
				tasks: ['sass'],
				event: 'all'
			},
			sass: {
				files: ['client/stylesheets/sass/**/*.{scss,sass}','client/stylesheets/sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist'],
				event: 'all'
			},
		},
	});

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['jshint', 'sass:dist', 'watch']);
};
