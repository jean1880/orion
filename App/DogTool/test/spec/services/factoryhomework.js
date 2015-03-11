'use strict';

describe('Service: FactoryHomework', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryHomework;
  beforeEach(inject(function (_FactoryHomework_) {
    FactoryHomework = _FactoryHomework_;
  }));

  it('should do something', function () {
    expect(!!FactoryHomework).toBe(true);
  });

});
