/**
 * Created by REIR8P on 8/18/2016.
 */

(function() {
  'use strict';

  angular.module('app')
    .controller('ptController', PtController);

  function PtController(medservice) {
    var vm = this;
    vm.pt = {
      name: "Jim",
      weight: {
        value: 12,
        unit: "kg"
      },
      meds: medservice.getMeds()
    }

  }

})();

