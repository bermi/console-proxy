# console-proxy

minimal console proxy for the browser and Node.js

[![Build Status](https://secure.travis-ci.org/bermi/console-proxy.png?branch=master)](http://travis-ci.org/bermi/console-proxy)

This module allows you to intercept console messages on all browsers
and on Node.js. It will not override the global console object.
Stubs are created for environments where console methods are not implemented.

Tested on IE7-IE10, Chrome, Safari and Firefox

## Installation

    $ npm install console-proxy

## Usage

Include the library on Node.js

    var consoleProxy = require('console-proxy');

or include the script for browser (0.44 KB gzipped) usage

     <script src="https://raw.github.com/bermi/jsonp-client/master/dist/jsonp-client.min.js" type="text/javascript"></script>


### Create a console proxy

    var console = consoleProxy.getConsole({
        log: function () {
          var args = Array.prototype.slice.apply(arguments);
          args.unshift("[info]", new Date());
          return args;
        }
      });

    console.log("Hello", "world");
    //=> [info] Sat Apr 27 2013 15:38:56 GMT+0200 (CEST) Hello world

console.[error/info/memory/profile] will continue working as expected unless they
are explicitly proxied


For a crossbrowser console example see examples/browser.html

### Getting the original console

If you want a reference to the unproxied console you can do so with

    var originalConsole = consoleProxy.getOriginalConsole();

## Testing

    $ make test

### On the browser

    $ make test-browser

### Code coverage

You will need to install https://github.com/visionmedia/node-jscoverage
and then run

    $ make test-coverage

## Development watcher and test runner

### Continuous linting

    $ make dev

### Continuous testing

    $ make test-watch

### Continuous linting + testing

    $ make dev-test


## License

(The MIT License)

Copyright (c) 2013 Bermi Ferrer &lt;bermi@bermilabs.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.