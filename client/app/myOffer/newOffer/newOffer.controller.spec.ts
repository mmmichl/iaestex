'use strict';

describe('Component: NewOfferComponent', function () {

  // load the controller's module
  beforeEach(module('iaestexApp.myOffer'));

  var NewOfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NewOfferComponent = $componentController('NewOfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
