'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard
  institutions = [
    'Austria',
    'Croatia',
    'Czech Republic',
    'Germany',
    'Hungary',
    'Slovakia',
    'Slovenia',
    'Swiss',
  ];

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        institution: this.user.institution,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('iaestexApp')
  .controller('SignupController', SignupController);
