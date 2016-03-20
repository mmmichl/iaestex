/**
 * module definition for the form validation handling
 *
 * build in validators:
 *  - `email`
 *  - `max`*
 *  - `maxlength`
 *  - `min`*
 *  - `minlength`
 *  - `number`
 *  - `pattern`*
 *  - `required`*
 *  - `url`
 *  - `date`
 *  - `datetimelocal`
 *  - `time`
 *  - `week`
 *  - `month`
 *
 *  *: html5 and angular (ng-) version
 *
 *  from https://github.com/angular/angular.js/blob/master/src/ng/directive/form.js#L20
 */


'use strict';

interface IValidationMessages {
  [index: string]: string;
}

enum NG_VALIDATORS {
  email = <any>'email',
  max = <any>'max',
  maxlength = <any>'maxlength',
  min = <any>'min',
  minlength = <any>'minlength',
  number = <any>'number',
  pattern = <any>'pattern',
  required = <any>'required',
  url = <any>'url',
  date = <any>'date',
  datetimelocal = <any>'datetimelocal',
  time = <any>'time',
  week = <any>'week',
  month = <any>'month',
}

(function () {

  let defaultValidationMessages: IValidationMessages = {
    [NG_VALIDATORS.email]: 'Invalid email',
    [NG_VALIDATORS.max]: 'Maximum value: ',
    [NG_VALIDATORS.maxlength]: 'Maximum length: ',
    [NG_VALIDATORS.min]: 'Minimum value: ',
    [NG_VALIDATORS.minlength]: 'Minimum length: ',
    [NG_VALIDATORS.required]: 'This field must be filled out',
    [NG_VALIDATORS.pattern]: 'This field is not in the right form',
    [NG_VALIDATORS.url]: 'This field is not a correct URL',
  };

  angular.module('iaestexApp.validation', [
      'ngMessages'
    ])
    .value('validationMessages', defaultValidationMessages)
  ;
})();
