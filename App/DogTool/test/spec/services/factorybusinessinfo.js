'use strict';

describe('Service: factorybusinessinfo', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factorybusinessinfo;
  beforeEach(inject(function (_factorybusinessinfo_) {
    factorybusinessinfo = _factorybusinessinfo_;
  }));

  it('should do something', function () {
    expect(!!factorybusinessinfo).toBe(true);
  });

});
