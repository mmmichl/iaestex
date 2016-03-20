'use strict';

angular.module('iaestexApp')
  .service('institute', class InstituteService {
    getAll() {
      return [
        'Austria',
        'Croatia',
        'Czech Republic',
        'Germany',
        'Hungary',
        'Slovakia',
        'Slovenia',
        'Swiss',
      ];
    }
  });
