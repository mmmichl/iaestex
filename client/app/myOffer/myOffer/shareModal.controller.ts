'use strict';
(function () {

  class ShareModalCtrl {
    private institutions = [];

    constructor(private institute, private $uibModalInstance, private offer, private $http, private Auth) {
      this.institutions = _.without(institute.getAll(), Auth.getCurrentUser().institution);
    }

    ok() {
      this.$http.put('/api/myOffers/' + this.offer._id, this.offer)
        .then(() => {
          alert('success');
          this.$uibModalInstance.close();
        })
        .catch(() => alert('failed'));
    };

    cancel() {
      this.$uibModalInstance.dismiss('cancel');
    };
  }

  angular.module('iaestexApp.myOffer')
    .controller('ShareModalCtrl', ShareModalCtrl);

})();
