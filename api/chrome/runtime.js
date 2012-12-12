// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

define('chrome.runtime', function(require, module) {
  var argscheck = cordova.require('cordova/argscheck');
  var events = require('helpers.events');
  var stubs = require('helpers.stubs');
  var mobile = require('chrome.mobile.impl');
  var exports = module.exports;
  var manifestJson = null;

  exports.onSuspend = {};

  exports.onSuspend.fire = events.fire('onSuspend');

  // Uses a trampoline to bind the Cordova pause event on the first call.
  exports.onSuspend.addListener = function(f) {
    window.document.addEventListener('pause', exports.onSuspend.fire, false);
    var h = events.addListener('onSuspend');
    console.log('sub-handler type: ' + typeof h);
    exports.onSuspend.addListener = h;
    exports.onSuspend.addListener(f);
  };

  exports.getManifest = function() {
    if (!manifestJson) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'manifest.json', false /* sync */);
      xhr.send(null);
      manifestJson = JSON.parse(xhr.responseText);
    }
    return manifestJson;
  };

  exports.getBackgroundPage = function(callback) {
    argscheck.checkArgs('f', 'chrome.runtime.getBackgroundPage', arguments);
    setTimeout(function() {
      callback(mobile.bgWindow);
    }, 0);
  };

  exports.getURL = function(subResource) {
    argscheck.checkArgs('s', 'chrome.runtime.getURL', arguments);
    if (subResource.charAt(0) == '/') {
      subResource = subResource.slice(1);
    }
    var prefix = location.href.replace(/[^\/]*$/, '');
    return prefix + subResource;
  };

  exports.reload = function() {
    location.reload();
  };

  stubs.createStub(exports, 'id', '{appId}');
  stubs.createStub(exports, 'requestUpdateCheck', function(){});
});
