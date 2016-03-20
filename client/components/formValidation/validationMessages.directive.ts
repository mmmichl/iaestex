/**
 * Directive to generate validation messages for the input option within the same grouping. By grouping it is meant the
 * grouping which bootstraps suggests to encapsulate a label and the corresponding input.
 *
 * Note following requirements:
 *  * there must be a "name" attribute on the input field
 *  * there must be a common parent for _one_ input field and this directive. In particular there must be the `.form-group` class
 */


interface IValidationMessageScope extends angular.IScope {
  formCtrl: angular.IFormController;
  modelCtrl: angular.INgModelController;
  messages: IValidationMessages;
}

angular.module('iaestexApp.validation')
  /** @ngInject */
  .directive('uiValidationMessages', function uiValidationMessages(validationMessages: IValidationMessages) {
    return {
      restrict: 'E',
      require: '^^form',
      template: `<div ng-messages="modelCtrl.$error" class="ui-validation" ng-show="modelCtrl.$touched || formCtrl.$submitted">
      <div ng-repeat="(valName, msg) in messages" ng-message="{{valName}}" ng-bind="msg" class="help-block"></div>
    </div>`,
      scope: {},
      link: function (scope: IValidationMessageScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes,
                      formCtrl: angular.IFormController) {
        let formGroup: angular.IAugmentedJQuery = findClosestByClass(['form-group', 'checkbox', 'radio'], element);
        if (formGroup === null) {
          throw new Error('ui-validation-messages: cannot find a common parent for input (looking for ' +
            'form-group or checkbox or radio class)');
        }

        // TODO what about checkbox  & radio #31823
        let inputElement: Element;
        inputElement = formGroup[0].querySelector('input[name], select[name], textarea[name]');

        if (!inputElement) {
          throw new Error('ui-validation-messages: can\'t find input. Name missing? or is non OR more than one input, select, ' +
            'textarea within the common parent grouping: ' + inputElement);
        }

        scope.formCtrl = formCtrl;
        scope.modelCtrl = formCtrl[inputElement.attributes.getNamedItem('name').value];
        scope.messages = {};

        angular.forEach(scope.modelCtrl.$validators, (val: Function, key: string) => {
          if (!validationMessages[key]) {
            throw new Error('No validation message defined for validator: ' + key);
          }
          scope.messages[key] = validationMessages[key];
        });

        angular.forEach(scope.modelCtrl.$asyncValidators, (val: Function, key: string) => {
          if (!validationMessages[key]) {
            throw new Error('No validation message defined for async validator: ' + key);
          }
          scope.messages[key] = validationMessages[key];
        });

        scope.$watch(() => {
          return !scope.modelCtrl.$valid && (scope.modelCtrl.$touched || scope.formCtrl.$submitted);
        }, function (isInvalid: boolean) {
          if (isInvalid) {
            formGroup.addClass('has-error');
          } else {
            formGroup.removeClass('has-error');
          }
        });
      }
    };

    function findClosestByClass(classes: string[], startElement: angular.IAugmentedJQuery): angular.IAugmentedJQuery {
      let elem: HTMLElement = startElement[0];

      while (elem) {
        if (classes.some(elem.classList.contains.bind(elem.classList))) {
          return angular.element(elem);
        }

        if (elem.nodeName.toLowerCase() === 'form') {
          // bale out, as we left the form already. Even if we find something future up, it is not what we are looking for
          return null;
        }

        elem = elem.parentElement;
      }

      return null;
    }
  });
