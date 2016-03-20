'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('iaestexApp')
  .directive('mongooseError', function(validationMessages) {
    validationMessages.mongoose = 'Mongoose error';
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('mongoose', true));
      }
    };
  });
