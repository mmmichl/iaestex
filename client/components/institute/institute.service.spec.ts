'use strict';

describe('Service: institute', function () {

  // load the service's module
  beforeEach(module('iaestexApp'));

  // instantiate service
  var institute;
  beforeEach(inject(function (_institute_) {
    institute = _institute_;
  }));

  it('should do something', function () {
    expect(!!institute).toBe(true);
  });

});
