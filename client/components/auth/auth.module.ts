'use strict';

angular.module('iaestexApp.auth', [
  'iaestexApp.constants',
  'iaestexApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
