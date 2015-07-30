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
var defaultRemotesList = ['create', 'upsert', 'exists', 'updateAll', 'findById', 'find', 'findOne', 'deleteById', 'count', 'prototype.updateAttributes'];

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

cls.extendDocs = function (model, method, doc) {
  if (doc.notes) {
    model.sharedClass.find(method, true).notes = doc.notes;
  }

  if (doc.description) {
    model.sharedClass.find(method, true).description = doc.description;
  }
}

cls.disableRemotes = function (model, disableList) {
  disableList.forEach(function (remote) {
    if (defaultRemotesList.indexOf(remote) !== -1) {
      model.disableRemoteMethod(remote, true);
    }
  })
}

cls.disableExcept = function (model, allowList) {
  defaultRemotesList.forEach(function (defaultRemote) {
    if (allowList.indexOf(defaultRemote) === -1) {
      model.disableRemoteMethod(defaultRemote, true);
    }
  })
}

cls.disableRelationExcept = function (model, relationType, relatedModelName, allowList) {
  var allList = {
    'hasMany': ['create', 'findById', 'delete', 'count', 'destroyById', 'get', 'updateById'],
    'belongsTo': ['get'],
    'hasOne': ['get'],
    'hasManyThrough': ['create', 'findById', 'delete', 'count', 'destroyById', 'get', 'updateById', 'exists', 'link', 'updateById', 'unlink']
  }

  var defaultList = allList[relationType];

  var realtionsList = [];
  var allowListCompiled = [];

  allowList.forEach(function (name) {
    allowListCompiled.push('__' + name + '__' + relatedModelName);
  })

  defaultList.forEach(function (name) {
    realtionsList.push('__' + name + '__' + relatedModelName);
  })

  realtionsList.forEach(function (defaultRemote) {
    if (allowListCompiled.indexOf(defaultRemote) === -1) {
      model.disableRemoteMethod(defaultRemote, false);
    }
  })
}

module.exports = cls;
