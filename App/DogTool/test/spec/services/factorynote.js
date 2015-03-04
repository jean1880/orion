'use strict';

describe('Service: FactoryNote', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryNote;
  beforeEach(inject(function (_FactoryNote_) {
    FactoryNote = _FactoryNote_;
  }));

  it('should do something', function () {
    expect(!!FactoryNote).toBe(true);
  });

});
