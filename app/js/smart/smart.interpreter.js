/**
 * Created by Kevin on 11/15/2016.
 */

(function () {
  'use strict';

  // service
  angular
    .module('app')
    .service('smartInterpreter', SmartInterpreter);

  function SmartInterpreter() {
    return {
      getPatientName: getPatientName,
      getMedicationName: getMedicationName,
      getLabs: getLabs
    };

    function getPatientName (pt) {
      if (pt.name) {
        var names = pt.name.map(function(name) {
          return name.given.join(" ") + " " + name.family.join(" ");
        });
        return names.join(" / ")
      } else {
        return "anonymous";
      }
    }

    function getMedicationName (medCodings) {
      var coding = medCodings.find(function(c){
        return c.system == "http://www.nlm.nih.gov/research/umls/rxnorm";
      });

      return coding && coding.display || "Unnamed Medication(TM)"
    }

    function getLabs(pt) {

    }
  }
})();

