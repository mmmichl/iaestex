'use strict';

describe('Component: MyOfferComponent', function () {

  // load the controller's module
  beforeEach(module('iaestexApp.myOffer'));

  var MyOfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MyOfferComponent = $componentController('MyOfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
