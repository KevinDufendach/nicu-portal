(function () {
  'use strict';

  angular.module('app.nicview', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/nicview', {
        templateUrl: 'nicview/nicview.html',
        controller: 'CareTeamCtrl'
      });
    }])

    .controller('NICViewCtrl', [function () {

    }]);
})();