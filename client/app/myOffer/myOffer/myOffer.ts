'use strict';

angular.module('iaestexApp.myOffer')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myOffer', {
        url: '/myOffer',
        template: '<my-offer></my-offer>'
      });
  });
