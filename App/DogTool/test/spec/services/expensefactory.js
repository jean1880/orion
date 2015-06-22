'use strict';

describe('Service: expensefactory', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var expensefactory;
  beforeEach(inject(function (_expensefactory_) {
    expensefactory = _expensefactory_;
  }));

  it('should do something', function () {
    expect(!!expensefactory).toBe(true);
  });

});
