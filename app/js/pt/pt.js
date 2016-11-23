/**
 * Created by Kevin on 11/16/2016.
 */

(function() {
  'use strict';

  angular
    .module('app.pt')
    .controller('Patient',Patient);

  function Patient(fhirInterpreter, fhirClient, $scope) {
    var vm = this;
    vm.title = 'MyTitle';
    vm.conditions = "";
    vm.getConditions = getConditions;

    vm.smartpt = {};
    vm.pt = {
      name: "",
      medName: {},
      observations: []
    };

    initialize();

    function initialize() {
// TODO change this to use promise logic (see https://github.com/johnpapa/ng-demos/blob/master/modular/src/client/app/avengers/avengers.js)
      vm.smartpt = fhirClient.patient;

      // vm.conditions = getConditions();

      // Create a patient banner by fetching + rendering demographics
      vm.smartpt.read().then(
        function(pt) {
        vm.pt.name = fhirInterpreter.getPatientName(pt);
        $scope.$apply();
      },
        function(pt, status) {
          console.log('Error getting patient name: [' + pt + ',' + status + ']');
        }
      );
    }

    function getConditions() {
      // return "placeholder for conditions";
      return fhirClient.patient.api.search({type: 'Condition'});
    }

    function getGestAge() {
      return fhirClient.patient.api.search({type: 'Observation'});
    }
  }
})();