/**
 * Created by Kevin on 12/5/2016.
 */
/**
 * Created by REIR8P on 8/18/2016.
 */

(function () {
  'use strict';

  var roles = Object.freeze({
    ATTENDING: {
      priority: 0,
      display: "attending neonatologist",
      description: "An attending neonatologist is a physician who oversees the team caring for infants in the NICU. A neonatologist has completed a training program specific to the care of sick or critically ill newborn infants."
    },
    FELLOW: {
      priority: 1,
      display: "neonatal fellow",
      description: "A neonatal fellow is a physician currently in specialized training specific for the care of sick or critically ill newborn infants. They have already completed training in general pediatrics."
    },
    APRN: {
      priority: 2,
      display: "advanced practice nurse practitioner",
      description: ""
    },
    RN: {
      priority: 3,
      display: "registered nurse",
      description: ""
    },
    RT: {
      priority: 4,
      display: "respiratory therapist",
      description: ""
    }
  });

  angular
    .module('app.care_team')
    .factory('careTeamService', CareTeamService);

  CareTeamService.$inject = ['$q'];

  function CareTeamService($q) {
    var team = [];

    var service = {
      getTeam: getTeam
    };

    initialize();
    return service;

    function initialize() {
      team = [
        {
          name: "Amy Nathan, MD",
          role: roles.ATTENDING,
          img: "/content/images/nathan-amy-square.jpg"

        },
        {
          name: "Melissa House, MD",
          role: roles.FELLOW,
          img: "/content/images/house-melissa-square.jpg"
        }
      ]
    }

    function getTeam() {
      return $q(function (resolve, reject) {
        resolve(team);
      });
    }
  }

})();