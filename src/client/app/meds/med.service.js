/**
 * Created by REIR8P on 8/18/2016.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('medservice', MedService);

  //////////////

  function Warning(lvl, msg) {
    return {
      lvl: lvl,
      msg: msg || "There was a warning"
    }
  }

  function MedService($q) {
    var service = {
      getMeds: getMeds,
      checkRange: checkRange,
      checkDose: checkDose,
      Warning: Warning
    };

    var severity = {
      NO_WARN: 0,
      WARN: 1,
      CRIT: 2
    };

    var dosingUnits = {
      MG: "mg",
      MGKG: "mg/kg",
      UNIT: "unit(s)",
      DROP: "drop(s)",
      MCG: "microgram(s)"
    };

    var medicationList = [
      {
        id: 10000,
        generic: "furosemide",
        brand: "Lasix",
        dosingUnits: [
          dosingUnits.MG,
          dosingUnits.MGKG
        ],
        rangeList: [
          {
            low: 0.5,
            hi: 1,
            severity: severity.WARN
          },
          {
            low: 0.4,
            hi: 1.2,
            severity: severity.CRIT
          }
        ]
      },
      {
        id: 10001,
        generic: "acetaminophen",
        brand: "Tylenol",
        dosingUnits: [
          dosingUnits.MG,
          dosingUnits.MGKG
        ],
        rangeList: [
          {
            low: 10,
            hi: 15,
            severity: severity.WARN
          },
          {
            low: 0,
            hi: 16,
            severity: severity.CRIT
          }
        ]
      }
    ];

    return service;

    ///////////

    function checkRange(val, med) {
      if (typeof val == 'undefined') return 0;

      var warningLvl = 0;
      var warningMsg = '';
      var range;

      for (var i = 0; i < med.rangeList.length; i++) {
        range = med.rangeList[i];

        var createWarningMsg = function(range) {
          // console.log("Outside recommended range [" + range.low + "," + range.hi + "]");
          return ("Outside recommended range [" + range.low + "," + range.hi + "]");
        };

        if (val < range.low || val > range.hi) {
          //warningLvl = Math.max(warningLvl, range.severity);
          if (range.severity > warningLvl) {
            warningLvl = range.severity;
            warningMsg = createWarningMsg(range);
          } else if (range.severity == warningLvl) {
            warningMsg = warningMsg + "; " + createWarningMsg(range);
          }
        }
      }

      return new Warning(warningLvl, warningMsg);
    }

    function checkDose(val, med) {
      return $q(function (resolve, reject) {

        console.log("checking range" + val + " for " + med.generic);
        var warn = checkRange(val, med);
        console.log("result lvl: " + warn.lvl);


        if (warn.lvl > severity.NO_WARN) {
          reject(warn);
        } else {
          resolve(warn);
        }
      });
    }

    function getMeds() {
      return medicationList;
    }
  }


})();