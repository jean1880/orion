'use strict';

describe('Service: factorydaycare', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factorydaycare;
  beforeEach(inject(function (_factorydaycare_) {
    factorydaycare = _factorydaycare_;
  }));

  it('should do something', function () {
    expect(!!factorydaycare).toBe(true);
  });

});
