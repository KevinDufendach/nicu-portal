/**
 * Created by REIR8P on 8/18/2016.
 */

(function () {
  'use strict';

  angular
    .module('app.meds')
    .directive('medInputCheck', MedInputCheckDirective);

  function MedInputCheckDirective(medservice) {
    return {
      require: 'ngModel',
      scope: {
        'med': '=',
        'pt': '='
      },
      controller: MedInputCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    function MedInputCtrl($element, $scope) {
      var vm = this;

      var ctrl = $element.controller('ngModel');

      ctrl.$asyncValidators.checkDose =
        function(modelValue, viewValue) {
          return medservice.checkDose(modelValue, vm.med);
        };
    }
  }
})();
