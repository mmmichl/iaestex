'use strict';

angular.module('testIaestexApp.auth', [
  'testIaestexApp.constants',
  'testIaestexApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
