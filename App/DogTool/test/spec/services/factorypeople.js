'use strict';

describe('Service: FactoryPeople', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryPeople;
  beforeEach(inject(function (_FactoryPeople_) {
    FactoryPeople = _FactoryPeople_;
  }));

  it('should do something', function () {
    expect(!!FactoryPeople).toBe(true);
  });

});
