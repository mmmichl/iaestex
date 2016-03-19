'use strict';
(function(){

class NewOfferComponent {
  //start-non-standard
  offer = {
  };
  errors = {};
  submitted = false;
  //end-non-standard

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
