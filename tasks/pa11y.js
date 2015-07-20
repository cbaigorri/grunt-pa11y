/*
 * grunt-pa11y
 * https://github.com/cbaigorri/grunt-pa11y
 *
 * Copyright (c) 2015 cbaigorri
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var pa11y = require('pa11y'),
      portscanner = require('portscanner'),
      async = require('async');

  grunt.registerTask('pa11y', 'Automated accessibility testing with Pa11y.', function() {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      reporter: 'console',
      standard: 'WCAG2AA',
      htmlcs: 'http://squizlabs.github.io/HTML_CodeSniffer/build/HTMLCS.js',
      config: null,
      timeout: 30000,
      debug: false
    });

    if (!options.url) {
      grunt.log.error('URL is required.');
      return done();
    }

    if (typeof options.url === 'string') {
      options.url = [options.url];
    }

    var urlsToTest = options.url;

    async.eachSeries(urlsToTest, function(url, callback) {
      grunt.log.verbose.ok('Getting ready to test', url, 'against the', options.standard, 'standard.');
      options.url = url;

      async.series({
        findPort: function(cb){
          // Port scanner
          portscanner.findAPortNotInUse(4000, 6000, 'localhost', function(err, freeport){
            if (err) {
              return cb(err);
            }
            // set the port
            options.port = freeport;
            return cb(null, freeport);
          });
        },
        sniff: function(cb){
          // Pa11y
          pa11y.sniff(options, function(err, results) {
            if (err) {
              return cb(err);
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

            return cb();
          });

        }
      }, function(err, results) {
        if (err) {
          grunt.log.error(err);
          return done(false);
        }
        return callback();
      });

    }, function(err) {
      if (err) {
        grunt.log.error(err);
        return done(false);
      }
      grunt.log.ok('All URLs have been processed successfully.');
      return done();
    });

  });

};
