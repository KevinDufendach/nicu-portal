/**
 * Created by Kevin on 11/21/2016.
 */
// from https://github.com/FHIR/fhir.js/blob/master/src/adapters/angularjs.js

(function() {

  var mkFhir = require('../fhir');

  angular.module('ng-fhir').provider('$fhir', function() {
    var prov;
    return prov = {
      $get: function($http, $q) {
        var adapter = {http: $http, defer: $q.defer};
        return mkFhir(prov, adapter);
      }
    };
  });

}).call(this);