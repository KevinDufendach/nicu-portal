/**
 * Created by Kevin on 12/14/2016.
 */

angular.module('app', ['ng-fhir'])
  .config(['$fhirProvider', function ($fhirProvider) {
    $fhirProvider.baseUrl = 'http://try-fhirplace.hospital-systems.com';
    $fhirProvider.auth = {
      user: 'user',
      pass: 'secret'
    };
    $fhirProvider.credentials = 'same-origin'
  }])
  .controller('mainCtrl', ['$scope', '$fhir', function ($scope, $fhir) {
    $fhir.search(
      {
        type: 'Patient',
        query: {name: 'emerald'}
      }).then(
      function (successData) {
        $scope.patients = successData.data.entry;

      },
      function (failData) {
        $scope.error = failData;
      }
    );
  }]);
