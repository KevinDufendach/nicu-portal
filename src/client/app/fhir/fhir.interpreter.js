/**
 * Created by Kevin on 11/15/2016.
 */

(function () {
  'use strict';

  // service
  angular
    .module('app.fhir')
    .service('fhirInterpreter', FhirInterpreter);

  function FhirInterpreter() {
    var self = this;
    var calls = {};

    var service = {
      getPatientName: getPatientName,
      getMedicationName: getMedicationName,
      getLabs: getLabs
    };

    initialize();
    return service;

    function initialize() {
      // calls = {
      //   'Patient': function () {
      //     return patient.read()
      //   },
      //   'Condition': generateCall("Condition"),
      //   'Observation': generateCall("Observation"),
      //   'MedicationOrder': generateCall("MedicationOrder"),
      //   'MedicationDispense': generateCall("MedicationDispense"),
      //   'Procedure': generateCall("Procedure"),
      //   'Immunization': generateCall("Immunization"),
      //   'FamilyMemberHistory': generateCall("FamilyMemberHistory"),
      //   'AllergyIntolerance': generateCall("AllergyIntolerance"),
      //   'DocumentReference': generateCall("DocumentReference"),
      //   'ImagingStudy': generateCall("ImagingStudy"),
      //   'CarePlan': generateCall("CarePlan")
      // };

      // $scope.resourceUrl = function(){
      //   return 'http://www.hl7.org/implement/standards/fhir/'+$scope.resource.toLowerCase()+'.html';
      // };
      //
      // Object.keys(calls).forEach(function(resource){
      //   var call = calls[resource];
      //   $scope[resource] = function(){
      //     $scope.resource = resource;
      //     $scope.fetchedData = null;
      //     call().done(function(r){
      //       var data = r.data || r;
      //       $scope.fetchedData = JSON.stringify(data, null, 2);
      //       $scope.$apply();
      //     });
      //   };
      // });
    }

    // function generateCall(resourceType) {
    //   return function () {
    //     return fhirClient.search({type: resourceType})
    //   };
    // }

    ////////////////////////////

    function getPatientName(pt) {
      if (pt.name) {
        var names = pt.name.map(function (name) {
          return name.given.join(" ") + " " + name.family.join(" ");
        });
        return names.join(" / ")
      } else {
        return "anonymous";
      }
    }

    function getMedicationName(medCodings) {
      var coding = medCodings.find(function (c) {
        return c.system == "http://www.nlm.nih.gov/research/umls/rxnorm";
      });

      return coding && coding.display || "Unnamed Medication(TM)"
    }

    function getLabs(pt) {

    }
  }
})();

