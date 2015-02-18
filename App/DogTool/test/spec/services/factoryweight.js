'use strict';

describe('Service: FactoryWeight', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryWeight;
  beforeEach(inject(function (_FactoryWeight_) {
    FactoryWeight = _FactoryWeight_;
  }));

  it('should do something', function () {
    expect(!!FactoryWeight).toBe(true);
  });

});
