'use strict';

describe('Service: factoryquote', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factoryquote;
  beforeEach(inject(function (_factoryquote_) {
    factoryquote = _factoryquote_;
  }));

  it('should do something', function () {
    expect(!!factoryquote).toBe(true);
  });

});
