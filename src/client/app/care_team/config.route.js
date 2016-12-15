(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.care_team')
    .config(['$routeProvider', routeProvider]);

  /* @ngInject */
  function routeProvider($routeProvider) {
    $routeProvider.when('/care_team', getConfig());
  }

  function getConfig() {
    return {
      templateUrl: 'app/care_team/care_team.html',
      controller: 'CareTeamCtrl',
      controllerAs: 'vm'
    };
  }
})();