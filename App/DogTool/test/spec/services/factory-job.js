'use strict';

describe('Service: factoryJob', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factoryJob;
  beforeEach(inject(function (_factoryJob_) {
    factoryJob = _factoryJob_;
  }));

  it('should do something', function () {
    expect(!!factoryJob).toBe(true);
  });

});
