'use strict';

angular.module('iaestexApp', [
  'iaestexApp.auth',
  'iaestexApp.admin',
  'iaestexApp.constants',
  'iaestexApp.myOffer',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
