/**
 * Created by Kevin on 11/22/2016.
 */
(function () {
  'use strict';

  // patientId: "1137192" // Joshua P Williams
  // patientId: "2004454" // Kevin Lee
  // patientId: "7321938" // Billie H. Himston

  angular.module('ng-fhir')
    .config(["fhirClientProvider", FhirProviderConfig]);

  function FhirProviderConfig(fhirClientProvider) {
    fhirClientProvider.setParams({
      serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
      patientId: "7321938"
    });
  }

})();