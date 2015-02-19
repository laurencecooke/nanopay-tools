'use strict';

/**
 * Different set of tools
 *
 * @company Nanopay inc.
 * @year 2015
 * @author Alex Strutsynskyi cajoy.dev@gmail.com
 */
var $promise = require('bluebird');

var cls = {};

cls.polymorph = function (func) {
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
  }
}

cls.disableExcept = function (model, allowList) {
  var defaultList = ['create', 'upsert', 'exists', 'updateAll', 'findById', 'find', 'findOne', 'deleteById', 'count', 'prototype.updateAttributes'];

  defaultList.forEach(function (defaultRemote) {
    if (allowList.indexOf(defaultRemote) === -1) {
      model.disableRemoteMethod(defaultRemote, true);
    }
  })
}

module.exports = cls;
