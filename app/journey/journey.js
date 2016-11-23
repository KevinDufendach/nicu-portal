(function () {
  'use strict';

  angular.module('app.journey', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/journey', {
        templateUrl: 'journey/journey.html',
        controller: 'JourneyCtrl'
      });
    }])

    .controller('JourneyCtrl', [function () {

    }]);

})();