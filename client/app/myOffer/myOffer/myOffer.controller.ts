'use strict';
(function(){

class MyOfferComponent {
  offers = [{refNo: 'nix'}];

  constructor(private $http, private $uibModal) {
  }

  $onInit() {
    this.$http.get('/api/myOffers')
      .then((resp) => this.offers = resp.data);
  }

  share(offer) {
    var modalInstance = this.$uibModal.open({
      templateUrl: 'app/myOffer/myOffer/shareModal.html',
      controller: 'ShareModalCtrl',
      size: 'lg',
      controllerAs: 'vm',
      resolve: {
        offer
      }
    });

  }
}

angular.module('iaestexApp.myOffer')
  .component('myOffer', {
    templateUrl: 'app/myOffer/myOffer/myOffer.html',
    controller: MyOfferComponent,
    controllerAs: 'vm'
  });

})();
