/// <reference path="../../../typings/tsd.d.ts" />

'use strict';
(function () {

  enum LanguageSkills {
    Excelent = <any>'Excelent',
    Good = <any>'Good',
    Poor = <any>'Poor'
  }

  class NewOfferComponent {
    public langLevels = Object.keys(LanguageSkills).map(k => LanguageSkills[k]);
    public languages = [
      'English',
      'German',
      'Indian',
      'Kroatian',
    ];
    public faculties = [
      'Computer Science',
      'Chemistry',
      'Physics',
      'Architecture',
    ];
    offer = {
      origin: 'Austria',
      languages: [{}],
      employer: {},
      lodgingBy: 'IAESTE'
    };
    errors = {};
    submitted = false;

    constructor(private $http: ng.IHttpService) {
    }

    save(form) {
      this.submitted = true;

      if (form.$valid) {
        this.$http.post('/api/myOffers', this.offer)
          .then(() => alert('success'))
          .catch(() => alert('failed'));
      }
    }
  }

  angular.module('iaestexApp.myOffer')
    .component('newOffer', {
      templateUrl: 'app/myOffer/newOffer/newOffer.html',
      controller: NewOfferComponent,
      controllerAs: 'vm',
    });

})();
