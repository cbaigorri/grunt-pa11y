/*
 * grunt-pa11y
 * https://github.com/cbaigorri/grunt-pa11y
 *
 * Copyright (c) 2015 cbaigorri
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('pa11y', 'Automated accessibility testing with Pa11y.', function() {

    // requires
    var pa11y = require('pa11y');
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      url: 'google.com',
      reporter: 'console',
      standard: 'WCAG2AA',
      htmlcs: 'http://squizlabs.github.io/HTML_CodeSniffer/build/HTMLCS.js',
      config: null,
      timeout: 30000,
      port: 12300,
      debug: false
    });

    // Pa11y
    pa11y.sniff(options, function(err, results) {
      if (err) {
        grunt.log.error(err);
        return done(false);
      }

      if (results.count.error <= 0) {
        grunt.log.verbose.ok('No errors');
      }

      if (results.count.warning <= 0) {
        grunt.log.verbose.ok('No warnings');
      }

      if (results.count.notice <= 0) {
        grunt.log.verbose.ok('No notices');
      }

      return done(results.count.error <= 0);
    });

  });

};
