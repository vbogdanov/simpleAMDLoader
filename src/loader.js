if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['requirejs'], function (requirejs) {
  'use strict';
  return function (fqn, done) {
    //FIXME: this changing of error handling for requirejs is NOT NICE :(
    var tmp = requirejs.onError;
    requirejs.onError = function (err) {
      if (err.moduleName === fqn) {
        if (err.originalError.code === 'MODULE_NOT_FOUND') {
          requirejs.onError = tmp;
          done(false, false);  
        } else {
          done(err);
        }  
      } else {
        tmp.apply(this, arguments);
      }
    };
    requirejs([fqn], function (mod) {
      requirejs.onError = tmp;
      done(false, mod);
    });
  };
});