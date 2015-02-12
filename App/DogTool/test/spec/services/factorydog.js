'use strict';

describe('Service: FactoryDog', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryDog;
  beforeEach(inject(function (_FactoryDog_) {
    FactoryDog = _FactoryDog_;
  }));

  it('should do something', function () {
    expect(!!FactoryDog).toBe(true);
  });

});
