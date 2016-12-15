/**
 * Created by Kevin on 12/14/2016.
 */

(function () {
  'use strict';

  /* @ngInject */
  angular.module('app.fhir')
    .config(['$fhirProvider', fhirProvider]);

  fhirProvider.$inject = ['$fhirProvider'];

  function fhirProvider($fhirProvider) {
    $fhirProvider.baseUrl = 'https://fhir-open-api-dstu2.smarthealthit.org';
    // $fhirProvider.baseUrl = 'http://try-fhirplace.hospital-systems.com';
    // $fhirProvider.baseUrl = 'https://open-ic.epic.com/Argonaut/api/FHIR/Argonaut/metadata';
    $fhirProvider.auth = {
      user: 'user',
      pass: 'secret'
    };
    $fhirProvider.credentials = 'same-origin'
  }

})();