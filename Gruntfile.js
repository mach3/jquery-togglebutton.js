
module.exports = function(grunt){

	var banner = grunt.template.process(
		grunt.file.read("src/banner.js"),
		{data: grunt.file.readJSON("package.json")}
	);

	grunt.initConfig({

		concat: {
			dist: {
				options: {banner: banner},
				files: {
					"dist/togglebutton.js": ["src/togglebutton.js"]
				}
			}
		},

		uglify: {
			dist: {
				options: {banner: banner},
				files: {
					"dist/togglebutton.min.js": ["src/togglebutton.js"]
				}
			}
		}

	});


	grunt.registerTask("default", ["concat", "uglify"]);

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");

};