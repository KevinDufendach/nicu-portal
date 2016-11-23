/**
 * Created by Kevin on 11/15/2016.
 */

(function () {
  'use strict';

  // service
  angular
    .module('app')
    .service('smartService', smart);

  function smart() {
    return FHIR.client({
    //   serviceUrl: 'https://fhir-open-api.smarthealthit.org',
    //   patientId: '1137192'

      serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
      // patientId: "1137192" // Joshua P Williams
      // patientId: "2004454" // Kevin Lee
      patientId: "7321938" // Billie H. Himston
    });
  }
})();

