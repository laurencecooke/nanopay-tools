'use strict';
/**
 * Different set of tools
 *
 * @company Nanopay inc.
 * @year 2014
 * @author Alex Strutsynskyi cajoy.dev@gmail.com
 */
var $promise = require('bluebird');

module.exports = tools;

function tools(app) {

  var bluebird = {};

  bluebird.polymorph = function (func) {
    return function () {
      if (typeof sync == 'undefined') {
        var sync = func;
        var async = new $promise.promisify(sync);
      }

      var args = [].slice.call(arguments);

      if (typeof args.slice(-1)[0] == 'function') {
        return sync.apply(this, arguments);
      } else {
        return async.apply(this, arguments);
      }
    };
  }

  return cls;
}
