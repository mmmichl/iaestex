describe('ValidationSubmit directive', () => {
  let $compile: angular.ICompileService;
  let $rootScope: angular.IRootScopeService;
  let errorSpy: jasmine.Spy;
  let clearSpy: jasmine.Spy;

  beforeEach(angular.mock.module('trisula.common.validation'));

  beforeEach(inject(($injector: angular.auto.IInjectorService) => {
    $compile = $injector.get<angular.ICompileService>('$compile');
    $rootScope = $injector.get<angular.IRootScopeService>('$rootScope');
    let toastr: angular.toastr.IToastrService = $injector.get<angular.toastr.IToastrService>('toastr');

    errorSpy = spyOn(toastr, 'error');
    clearSpy = spyOn(toastr, 'clear');
  }));

  it('should add the "novalidate" attribute', () => {
    let element: angular.IAugmentedJQuery = $compile(`
      <form ui-valid-submit="">
      </form>
    `)($rootScope.$new());

    expect(element.attr('novalidate')).toBeDefined();
  });

  it('should not submit the form if it is not valid', () => {
    let scope: any = $rootScope.$new();
    scope.submit = jasmine.createSpy('submit');
    let element: angular.IAugmentedJQuery = $compile(`
      <form name="test" ui-valid-submit="submit()">
      </form>
    `)(scope);

    scope.test.$valid = false;

    element.triggerHandler('submit');

    expect(scope.submit).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it('should submit the form if it is valid, remove toast messages and reset form state', () => {
    let scope: any = $rootScope.$new();
    scope.submit = jasmine.createSpy('submit');
    let element: angular.IAugmentedJQuery = $compile(`
      <form name="test" ui-valid-submit="submit()">
      </form>
    `)(scope);

    element.triggerHandler('submit');

    expect(scope.test.$submitted).toBe(false);

    expect(scope.submit).toHaveBeenCalledTimes(1);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});
