// console-proxy
// -----------------
// Copyright(c) 2013 Bermi Ferrer <bermi@bermilabs.com>
// MIT Licensed
(function (root) {
  "use strict";

  var
  // Save the previous value of the `consoleProxy` variable.
  previousconsoleProxy = root.consoleProxy,

  is_node = typeof module !== 'undefined' && module.exports,

  original_console = console || {},

  overrideConsole,

  // Create a safe reference to the consoleProxy object for use below.
  consoleProxy = {

    // Run consoleProxy in *noConflict* mode, returning the `consoleProxy`
    // variable to its previous owner. Returns a reference to
    // the consoleProxy object.
    noConflict: function () {
      root.consoleProxy = previousconsoleProxy;
      return consoleProxy;
    },

    getOriginalConsole: function () {
      return original_console;
    },

    getConsole: function (methods) {
      var method,
        new_console = {};
      for (method in original_console) {
        if (methods.hasOwnProperty(method)) {
          new_console[method] = getConsoleOverrideMethod(method, methods[method]);
        } else {
          if (typeof original_console[method] === 'function') {
            new_console[method] = getMethodFuncion(method);
          }
        }
      }
      return new_console;
    }
  };

  function getMethodFuncion(method) {
    return function () {
      if (Function.prototype.apply) {
        return Function.prototype.apply.call(original_console[method], original_console, arguments);
      } else {
        original_console[method](Array.prototype.slice.apply(arguments).join(" "));
      }
    };
  }

  function getConsoleOverrideMethod(method, fn) {
    var original_method = original_console[method],
      override;
    override = function () {
      var message, result;
      if (original_method && original_method.apply) {
        result = fn.apply(original_console, arguments);
        result = original_method.apply(original_console, result || arguments);
      } else {
        // On IE or JS environments without nf.apply we will simply call
        // back the method with stringified arguments
        message = Array.prototype.slice.apply(arguments).join(" ");
        result = fn(message);
        if (original_method) {
          result = original_method(result || message);
        }
      }
      return result;
    };
    return override;
  }

  // Export the consoleProxy object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `consoleProxy` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (is_node) {
    module.exports = consoleProxy;
  } else {
    // Set consoleProxy on the browser window
    root.consoleProxy = consoleProxy;
  }

  // Establish the root object, `window` in the browser, or `global` on the server.
  // when included on a closure it will be scoped to the closure.
}(this));