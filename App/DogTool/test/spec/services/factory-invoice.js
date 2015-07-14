'use strict';

describe('Service: factoryInvoice', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factoryInvoice;
  beforeEach(inject(function (_factoryInvoice_) {
    factoryInvoice = _factoryInvoice_;
  }));

  it('should do something', function () {
    expect(!!factoryInvoice).toBe(true);
  });

});
