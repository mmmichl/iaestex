'use strict';

angular.module('iaestexApp.myOffer')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myOfferNew', {
        url: '/myOffer/new',
        template: '<new-offer></new-offer>'
      });
  });
