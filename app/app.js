(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('app.components', [
    'app.view1',
    'app.view2',
    'app.journey',
    'app.care_team',
    'app.nicview',
    'app.pt',

    // components
    'app.version'
  ]).
  config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);

})();