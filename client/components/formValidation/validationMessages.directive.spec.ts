describe('ValidationMessages directive', () => {
  let $compile: angular.ICompileService;
  let $rootScope: angular.IRootScopeService;
  let savedMessages: IValidationMessages;

  beforeEach(angular.mock.module('trisula.common.validation'));

  beforeEach(inject(($injector: angular.auto.IInjectorService) => {
    $compile = $injector.get<angular.ICompileService>('$compile');
    $rootScope = $injector.get<angular.IRootScopeService>('$rootScope');
    savedMessages = angular.copy($injector.get<IValidationMessages>('validationMessages'));
  }));

  afterEach(inject((validationMessages: IValidationMessages) => {
    angular.extend(validationMessages, savedMessages);
  }));

  it('should throw an exception if a parent element with the class \'form-group\' can not not be found', () => {
    expect(() => {
      $compile(`
        <form>
          <div>
            <ui-validation-messages></ui-validation-messages>
          </div>
        </form>`)($rootScope);
    }).toThrowError(/cannot find a common parent/);
  });

  it('should not find a element with the class \'form-group\' outside of the form element', () => {
    expect(() => {
      $compile(`
        <div class="form-group">
          <form>
            <div>
              <ui-validation-messages></ui-validation-messages>
            </div>
          </form>
        </div>`)($rootScope);
    }).toThrowError(/cannot find a common parent/);
  });

  it('should find an input element on the same level as <ui-validation-messages>', () => {
    expect(() => {
      $compile(`
        <form>
          <div class="form-group">
            <input name="user" ng-model="user">
            <ui-validation-messages></ui-validation-messages>
          </div>
        </form>
      `)($rootScope);
    }).not.toThrow();
  });

  it('should find an input element in a wrapper which is on the same level as <ui-validation-messages>', () => {
    expect(() => {
      $compile(`
        <form>
          <div class="form-group">
            <div class="input-wrap">
              <input name="user" ng-model="user">
            </div>
            <ui-validation-messages></ui-validation-messages>
          </div>
        </form>
      `)($rootScope);
    }).not.toThrow();
  });

  it('should find an input element in an other branch as <ui-validation-messages>', () => {
    expect(() => {
      $compile(`
        <form>
          <div class="form-group">
            <div class="input-wrap">
              <input name="user" ng-model="user">
            </div>
            <div class="validation-wrap">
              <ui-validation-messages></ui-validation-messages>
            </div>
          </div>
        </form>
      `)($rootScope);
    }).not.toThrow();
  });

  it('should throw an exception if an input element a name attribute cannot be found', () => {
    expect(() => {
      $compile(`
        <form>
          <div class="form-group">
            <input ng-model="user">
            <ui-validation-messages></ui-validation-messages>
          </div>
        </form>
      `)($rootScope);
    }).toThrowError(/Name missing?/);
  });

  it('should throw an exception if a validation message is not defined', inject((validationMessages: IValidationMessages) => {
    validationMessages[NG_VALIDATORS.required] = undefined;

    expect(() => {
      $compile(`
        <form>
          <div class="form-group">
            <input name="user" ng-model="user" minlength="3" required>
            <ui-validation-messages></ui-validation-messages>
          </div>
        </form>
      `)($rootScope.$new());
    }).toThrowError('No validation message defined for validator: required');
  }));

  it('should set the form and model controller to the scope as well as the messages of the applied validators', () => {
    let scope: IValidationMessageScope;
    let element: angular.IAugmentedJQuery = $compile(`
        <form>
          <div class="form-group">
            <input name="user" ng-model="user" minlength="3" required>
            <ui-validation-messages></ui-validation-messages>
          </div>
        </form>
      `)($rootScope.$new());

    let validDirective: angular.IAugmentedJQuery = element.find('ui-validation-messages');
    scope = <IValidationMessageScope>validDirective.isolateScope();

    expect(scope.formCtrl).toBeDefined();
    expect(scope.modelCtrl).toBeDefined();
    expect(scope.messages).toBeDefined();
    expect(scope.messages[NG_VALIDATORS.minlength]).toBeDefined();
    expect(scope.messages[NG_VALIDATORS.required]).toBeDefined();

    expect(validDirective[0].getElementsByClassName('ui-validation').length).toBe(1);
    // no block visible yet
    expect(validDirective[0].getElementsByClassName('help-block').length).toBe(0);

    scope.formCtrl.$setSubmitted();
    $rootScope.$digest();

    expect(validDirective[0].getElementsByClassName('help-block').length).toBe(1);

    scope.modelCtrl.$setViewValue('1234');

    expect(validDirective[0].getElementsByClassName('help-block').length).toBe(0);
  });
});
