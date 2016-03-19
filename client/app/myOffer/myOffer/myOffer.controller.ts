'use strict';
(function(){

class MyOfferComponent {
  offers = [{refNo: 'nix'}];

  constructor(private $http) {
  }

  $onInit() {
    this.$http.get('/api/myOffers')
      .then((resp) => this.offers = resp.data);
  }
}

angular.module('iaestexApp.myOffer')
  .component('myOffer', {
    templateUrl: 'app/myOffer/myOffer/myOffer.html',
    controller: MyOfferComponent,
    controllerAs: 'vm'
  });

})();
