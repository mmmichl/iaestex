/**
 * Directive to deny executing the form submit method, if errors in the form exist.
 * If the attribute @novalidate@ is missing on the form, this directive automatically adds it. This is done, as this
 * directive anyhow ensures valid data before the submit callback is invoked.
 */

angular.module('iaestexApp.validation')
  /** @ngInject */
  .directive('uiValidSubmit', function uiValidSubmit($parse: angular.IParseService, $log: angular.ILogService): angular.IDirective {
    return {
      restrict: 'A',
      require: 'form',
      link: function (scope: angular.IScope, formElement: angular.IAugmentedJQuery, attrs: any,
                      controller: angular.IFormController) {

        let fn: angular.ICompiledExpression = $parse(attrs.uiValidSubmit);

        formElement.attr('novalidate', '');

        formElement.on('submit', function (event: JQueryEventObject) {
          if (!controller.$valid) {
            $log.debug('Form is not valid, submission is repressed', controller.$error);
            return false;
          }

          controller.$setUntouched();
          controller.$setPristine();

          scope.$apply(function () {
            fn(scope, {
              $event: event
            });
          });
        });
      }
    };
  });
