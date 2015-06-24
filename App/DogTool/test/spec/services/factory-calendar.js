'use strict';

describe('Service: factoryCalendar', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factoryCalendar;
  beforeEach(inject(function (_factoryCalendar_) {
    factoryCalendar = _factoryCalendar_;
  }));

  it('should do something', function () {
    expect(!!factoryCalendar).toBe(true);
  });

});
