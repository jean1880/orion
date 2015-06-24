'use strict';

describe('Service: factoryJobtype', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factoryJobtype;
  beforeEach(inject(function (_factoryJobtype_) {
    factoryJobtype = _factoryJobtype_;
  }));

  it('should do something', function () {
    expect(!!factoryJobtype).toBe(true);
  });

});
