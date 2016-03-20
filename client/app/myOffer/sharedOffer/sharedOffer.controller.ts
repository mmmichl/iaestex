'use strict';
(function(){

class SharedOfferComponent {
  offers = [{refNo: 'nix'}];

  constructor(private $http) {
  }

  $onInit() {
    this.$http.get('/api/myOffers/shared')
      .then((resp) => this.offers = resp.data);
  }
}

angular.module('iaestexApp.myOffer')
  .component('sharedOffer', {
    templateUrl: 'app/myOffer/sharedOffer/sharedOffer.html',
    controller: SharedOfferComponent,
    controllerAs: 'vm'
  });

})();
