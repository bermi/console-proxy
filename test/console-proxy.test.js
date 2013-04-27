(function (root) {
  "use strict";

  var expect = root.expect || require('expect.js'),
    consoleProxy;

  if (typeof window === 'undefined') {
    root.consoleProxy = "original";
    consoleProxy = require('../');
  } else {
    consoleProxy = root.consoleProxy;
  }

  describe('consoleProxy', function () {

    describe('No conflict', function () {
      it('should restore original consoleProxy', function () {
        var proxy = consoleProxy,
          currentVersion = proxy.noConflict();
        expect(currentVersion).to.be(proxy);
        expect(root.consoleProxy).to.be("original");
      });
    });

    describe('When proxying console methods, it:', function () {
      var console, args;
      before(function () {

        var log = function () { args = Array.prototype.slice.call(arguments); };
        console = consoleProxy.getConsole({
          log: log,
          error: log
        });
      });

      it('should allow us to override the log method', function () {
        console.log('Log', 'me');
        expect(args.join(" ")).to.be.eql('Log me');
      });

      it('should allow us to override the error method', function () {
        console.log('Log', 'me');
        expect(args.join(" ")).to.be.eql('Log me');
      });

      it('should allow us to use the original info method', function () {
        args = null;
        console.info("Info called");
        expect(args).to.be(null);
      });

      it('should revert to the original method', function () {
        args = null;
        console = consoleProxy.getOriginalConsole();
        console.log('Log', 'me');
        expect(args).to.be(null);
      });
    });

    describe("When proxying response parameters", function () {
      var console;
      before(function () {
        console = consoleProxy.getConsole({
          log: function () {
            var args = Array.prototype.slice.apply(arguments);
            args.unshift("[info]", new Date());
            return args;
          }
        });
      });

      it("should proxy parameter to the next caller", function () {
        console.log("Hello", "world");
      });

    });

  });

}(this));