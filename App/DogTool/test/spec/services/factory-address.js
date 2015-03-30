'use strict';

describe('Service: FactoryAddress', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryAddress;
  beforeEach(inject(function (_FactoryAddress_) {
    FactoryAddress = _FactoryAddress_;
  }));

  it('should do something', function () {
    expect(!!FactoryAddress).toBe(true);
  });

});
