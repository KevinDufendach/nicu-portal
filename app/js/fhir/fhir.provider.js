/**
 * Created by Kevin on 11/22/2016.
 */

// https://github.com/FHIR/fhir.js/blob/master/src/adapters/angularjs.js

(function () {
  'use strict';

  //var mkFhir = require('../fhir');

  angular.module('ng-fhir')
    .provider('fhirClient', FHIRClientProvider);

  function FHIRClientProvider() {
    var params = {
      serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
      patientId: "1137192"
    };

    this.setParams = function(newParams) {
      params = newParams;
    };

    this.$get = function() {
      return FHIR.client(params);
    };

//     var prov;

//     return prov = {
//       $get: function ($http, $q) {
//         var adapter = {http: $http, defer: $q.defer};
//         return FHIR(prov, adapter);
//       }
//     };

  }

})();