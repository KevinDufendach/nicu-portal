(function () {
  'use strict';

  angular
    .module('app.care_team')

    .controller('CareTeamCtrl', CareTeamCtrl);

  function CareTeamCtrl(careTeamService) {
    var vm = this;
    vm.team = [];

    initialize();

    function initialize() {
      vm.team = careTeamService.getTeam().then(
        function (data) {
          vm.team = data;
        },
        function (data, er) {
          console.log('unable to get team');
        }
      );
    }

  }
})();