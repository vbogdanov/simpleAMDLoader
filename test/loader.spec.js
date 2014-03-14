/* global describe: false */
/* global it: false */
/* global expect: false */
/* global jasmine: false */
/* jshint maxstatements: 30 */
'use strict';

var requirejs = require('requirejs');
requirejs.config({
  baseUrl: process.env.PWD //nodejs only
});

describe('amdloader', function () {
  var loader;
  beforeEach(function (next) {
    requirejs(['src/loader'], function (ld) {
      loader = ld;
      next();
    });
  });

  it('is a function', function () {
    expect(loader).toEqual(jasmine.any(Function));
  });

  it('loads a module by name', function (next) {
    loader('test/fake', function (err, data) {
      expect(err).toBeFalsy();
      expect(data.text).toEqual('success');
      next();
    });
  });

  it('returns false if no such module is present', function (next) {
    loader('test/notExisting', function (err, data) {
      expect(err).toBeFalsy();
      expect(data).toBeFalsy();
      next();
    });
  });

});