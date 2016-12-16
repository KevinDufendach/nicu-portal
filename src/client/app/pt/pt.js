/**
 * Created by Kevin on 11/16/2016.
 */

(function () {
  'use strict';

  angular
    .module('app.pt')
    .controller('Patient', PatientCtrl);

  /* @ngInject */
  PatientCtrl.$inject = ['$fhir', '$scope', '$q', 'fhirInterpreter'];

  function PatientCtrl($fhir, $scope, $q, fhirInterpreter) {
    var vm = this;
    vm.title = 'MyTitle';
    vm.conditions = "";
    vm.meds = ['myMed'];
    vm.obsList = ['myObs'];
    vm.patients = [];
    vm.selectedPatient = -1;
    vm.resources = [
      {type: 'name'},
      {type: 'identifier'}
    ];
    vm.queryType = vm.resources[0].type;
    vm.queryText = 'billie';
    vm.pt = {};
    vm.weights = [];
    vm.loadWeights = loadWeights;

    vm.sampleSearches = [
      {
        display: 'Aaron (wts)',
        type: 'identifier',
        query: '9995679'
      },
      {
        display: 'Angela (wts)',
        type: 'identifier',
        query: '7777705'
      },
      {
        display: 'Billie',
        type: 'name',
        query: 'billie'
      },
      {
        display: 'query: william',
        type: 'name',
        query: 'william'
      }
    ];
    vm.loadSample = function(sample) {
      vm.queryType = sample.type;
      vm.queryText = sample.query;
      vm.performSearch();
    };

    vm.getName = function (pt) {
      return (fhirInterpreter.getPatientName(pt));
    };

    vm.activatePatient = function (pt) {
      vm.pt = pt;
    };

    vm.performSearch = function () {
      var searchArgs = {
        type: 'Patient',
        query: {}
      };
      searchArgs.query[vm.queryType] = vm.queryText;

      $fhir.search(searchArgs).then(
        function (successData) {
          vm.patients = successData.data.entry;

          if (vm.patients.length > 0) {
            vm.selectedPatient = 0;
            vm.pt = vm.patients[vm.selectedPatient].resource;
          }
        },
        function (failData) {
          var t = failData;
        }
      );
    };

    var searchList = [
      {
        type: 'Observation',
        query: {
          subject: '7321938'
        }
      },
      {
        type: 'Observation',
        query: {
          subject: '7321938',
          code: '18185-9'
        }
      },
      {
        type: 'Observation',
        query: {
          subject: '9995679',
          code: '3141-9'
        }
      }

    ];

    performTestQuery();

    function performTestQuery() {
      $fhir.search(searchList[2]).then(
        function (successData) {
          vm.queryResults = successData.data;
        }
      )
    }

    function getSubjectId(fhirPt) {
      return (fhirPt.id);
    }

    function loadWeights() {
      var search = {
        type: 'Observation',
        query: {
          subject: getSubjectId(vm.pt),
          code: '3141-9'
        }
      };

      $fhir.search(search).then(
        // get weights from search, parse and place into vm.weights
        function (successData) {
          vm.weights = [];
          for (var i = 0; i < successData.data.total; i++) {
            vm.weights[i] = successData.data.entry[i].resource;
          }
        }
      )

    }

  }

//
//     vm.smartpt = {};
//     vm.pt = {
//       name: "",
//       medName: {},
//       observations: []
//     };
//
//     vm.fhirPt = {};
//
//     initialize();
//
//     function initialize() {
// // TODO change this to use promise logic (see https://github.com/johnpapa/ng-demos/blob/master/modular/src/client/app/avengers/avengers.js)
//       vm.smartpt = fhirClient.patient;
//
//       // vm.conditions = getConditions();
//
//       // Create a patient banner by fetching + rendering demographics
//       vm.smartpt.read().then(
//         function (pt) {
//           vm.fhirPt = pt;
//           vm.pt.name = fhirInterpreter.getPatientName(pt);
//           $scope.$apply();
//         },
//         function (pt, status) {
//           console.log('Error getting patient name: [' + pt + ',' + status + ']');
//         }
//       );
//
//       getMeds(vm.smartpt).then(
//         function(meds) {
//           vm.meds = meds;
// //           $scope.$apply();
//         }
//       );
//
//       getObservations(vm.smartpt).then(
//         function(obsList) {
//           vm.obsList = obsList;
// //           $scope.$apply();
//         }
//       )
//
//     }
//
//     function getConditions() {
//       // return "placeholder for conditions";
//       return fhirClient.patient.api.search({type: 'Condition'});
//     }
//
//     // function getGestAge() {
//     //   return fhirClient.patient.api.search({type: 'Observation'});
//     // }
//
//
//     function getMeds(smartPt) {
//
//       return $q(function(resolve, reject) {
//         // A more advanced query: search for active Prescriptions, including med details
//
//         //noinspection JSUnresolvedFunction
//         smartPt.api.fetchAllWithReferences({type: "MedicationOrder"},["MedicationOrder.medicationReference"]).then(function(results, refs) {
//           var medList = [];
//
//           results.forEach(function(prescription){
//             if (prescription.medicationCodeableConcept) {
//               medList.push(prescription.medicationCodeableConcept.coding);
//             } else if (prescription.medicationReference) {
//               var med = refs(prescription, prescription.medicationReference);
//               medList.push(med && med.code.coding || []);
//             }
//           });
//
//           resolve(medList);
//         });
//       });
//     }
//
//     function getObservations(smartPt) {
//
//       return $q(function(resolve, reject) {
//       //   // A more advanced query: search for active Prescriptions, including med details
//       //
//       //   //noinspection JSUnresolvedFunction
//         smartPt.api.fetchAllWithReferences({type: "Observation"},["Observation.valueCodeableConcept"]).then(function(results, refs) {
//           var obsList = [];
//
//           results.forEach(function(obs){
//             if (obs.valueCodeableConcept) {
//               obsList.push(obs.valueCodeableConcept.coding);
//             }
//           });
//
//           resolve(results);
//         });
//       });
//     }
//
//   }
})();