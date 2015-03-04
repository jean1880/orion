'use strict';

describe('Service: FactoryCost', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryCost;
  beforeEach(inject(function (_FactoryCost_) {
    FactoryCost = _FactoryCost_;
  }));

  it('should do something', function () {
    expect(!!FactoryCost).toBe(true);
  });

});
