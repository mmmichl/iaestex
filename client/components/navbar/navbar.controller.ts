'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    title: 'My Offer',
    state: 'myOffer',
    role: 'user',
  }, {
    title: 'Shared Offer',
    state: 'sharedOffer',
    role: 'user',
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(private Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  hasRole(roles) {
    if (!roles) { return true; }
    return this.Auth.hasRole(roles);
  }
}

angular.module('iaestexApp')
  .controller('NavbarController', NavbarController);
