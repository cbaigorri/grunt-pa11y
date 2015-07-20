# grunt-pa11y

> Automated accessibility testing with Pa11y.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pa11y --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pa11y');
```

## The "pa11y" task

### Overview
In your project's Gruntfile, add a section named `pa11y` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pa11y: {
    options: {
      url: 'google.com'
    }
  },
});
```

### Options

#### options.url
Type: `String`
Default value: `'google.com'`

The URL to sniff. Required.

#### options.reporter
Type: `String`, `Object`
Default value: `console`

The reporter to use. This can be a string (see [command-line usage](https://github.com/nature/pa11y#command-line-usage)) or an object (see [custom reporters](https://github.com/nature/pa11y#custom-reporters)).

#### options.standard
Type: `String`
Default value: `'WCAG2AA'`

The standard to use. One of `Section508`, `WCAG2A`, `WCAG2AA`, `WCAG2AAA`. Default `WCAG2AA`.

#### options.htmlcs
Type: `String`
Default value: `'http://squizlabs.github.io/HTML_CodeSniffer/build/HTMLCS.js'`

The URL to source HTML_CodeSniffer from.

#### options.config
Type: `String`, `Object`
Default value: `null`

The path to a JSON config file or a config object (see [configuration](https://github.com/nature/pa11y#configuration)).

#### options.timeout
Type: `Number`
Default value: `30000`

The number of milliseconds before a timeout error occurs.

#### options.debug
Type: `Boolean`
Default value: `false`

Whether to report debug-level messages.

### Usage Examples

#### Default Options
Running the task without any options will fail as the `url` is required.

```js
grunt.initConfig({
  pa11y: {
    options: {}
  },
});
```

#### Custom Options
In this example, you are testing the url against the WCAG2AAA standard.

```js
grunt.initConfig({
  pa11y: {
    options: {
      url: 'google.com',
      standard: 'WCAG2AAA'
    }
  },
});
```
#### Multiple URLs
In this example, you are testing the multiple urls against the WCAG2AAA standard.

```js
grunt.initConfig({
  pa11y: {
    options: {
      url: ['google.com', 'yahoo.com'],
      standard: 'WCAG2AAA'
    }
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
05-07-2015 Initial version 0.1.0 released.

05-08-2015 Version 0.1.1 released.

05-12-2015 Version 0.1.2 released.

07-20-2015 Version 0.1.3 released.
