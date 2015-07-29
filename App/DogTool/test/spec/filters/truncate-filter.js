'use strict';

describe('Filter: truncateFilter', function () {

  // load the filter's module
  beforeEach(module('dogToolApp'));

  // initialize a new instance of the filter before each test
  var truncateFilter;
  beforeEach(inject(function ($filter) {
    truncateFilter = $filter('truncateFilter');
  }));

  it('should return the input prefixed with "truncateFilter filter:"', function () {
    var text = 'angularjs';
    expect(truncateFilter(text)).toBe('truncateFilter filter: ' + text);
  });

});
