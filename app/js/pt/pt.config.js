/**
 * Created by Kevin on 11/22/2016.
 */
(function () {
  'use strict';

  angular.module('ng-fhir')
    .config(function (fhirProvider) {
      fhirProvider.serviceUrl = "https://fhir-open-api-dstu2.smarthealthit.org";
      fhirProvider.patientId = "2004454";
  });

})();