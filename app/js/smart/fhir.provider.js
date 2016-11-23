/**
 * Created by Kevin on 11/22/2016.
 */

// https://github.com/FHIR/fhir.js/blob/master/src/adapters/angularjs.js

(function () {

  //var mkFhir = require('../fhir');

  angular.module('ng-fhir')
    .provider('fhirProvider', SmartProvider);

  function SmartProvider() {
    var serviceUrl = "https://fhir-open-api-dstu2.smarthealthit.org";
    var patientId = "1137192";

//     var prov;

//     return prov = {
//       $get: function ($http, $q) {
//         var adapter = {http: $http, defer: $q.defer};
//         return FHIR(prov, adapter);
//       }
//     };

    return {
      $get: function ($http, $q) {
        return FHIR.client({serviceUrl: serviceUrl, patientId: patientId});
      }
    }

  }

})();