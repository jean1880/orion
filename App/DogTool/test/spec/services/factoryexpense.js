'use strict';

describe('Service: factoryexpense', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factoryexpense;
  beforeEach(inject(function (_factoryexpense_) {
    factoryexpense = _factoryexpense_;
  }));

  it('should do something', function () {
    expect(!!factoryexpense).toBe(true);
  });

});
