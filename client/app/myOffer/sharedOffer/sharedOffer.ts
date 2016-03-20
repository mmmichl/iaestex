'use strict';

angular.module('iaestexApp.myOffer')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sharedOffer', {
        url: '/sharedOffer',
        template: '<shared-offer></shared-offer>'
      });
  });
