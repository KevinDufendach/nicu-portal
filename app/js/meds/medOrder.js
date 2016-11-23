/**
 * Created by REIR8P on 8/18/2016.
 */

(function () {
  'use strict';

  angular
    .module('app.meds')
    .directive('medOrder', MedOrderDirective);

  function MedOrderDirective() {
    return {
      restrict: 'E',
      // require: 'ng-messages',
      scope: {
        med: '=',
        pt: '='
      },
      templateUrl: "med-order.html",
      controller: MedOrderCtrl,
      controllerAs: 'vm',
      bindToController: true
    }
  }

  var PASS = true,
    FAIL = false,
    PENDING = undefined;

  function MedOrderCtrl(medservice, $q) {
    var ctrl = this;

    //////////////////
    // Validation
    this.validators = {};
    this.asyncValidators = {};
    this.valid = true;
    this.invalid = false;
    this.pending = false;
    this.error = {};
    this.success = {};
    this.pnd = {};
    this.runValidators = runValidators;

    ///////////////////
    // Model
    this.onChange = onChange;
    this.MedValidationRule = MedValidationRule;

    initialize();


    // based on https://github.com/angular/angular.js/blob/master/src/ng/directive/ngModel.js#L896
    // Helper methods
    function set(object, property) {
      object[property] = true;
    }
    function unset(object, property) {
      delete object[property];
    }

    var currentValidationRunId = 0;

    function runValidators() {
      currentValidationRunId++;
      var localValidationRunId = currentValidationRunId;

      processAsyncValidators();

      function processAsyncValidators() {
        var validatorPromises = [];
        var allValid = true;
        angular.forEach(ctrl.asyncValidators, function(medValidationRule, name) {
          var promise = medValidationRule.asyncValidator();
          if (!isPromiseLike(promise)) {
            throw ngModelMinErr('nopromise',
              'Expected asynchronous validator to return a promise but got \'{0}\' instead.', promise);
          }
          setValidity(name, undefined);
          validatorPromises.push(promise.then(
            function() {
              setValidity(name, true);
            },
            function() {
              allValid = false;
              setValidity(name, false);
            }
          ));
        });

        if (!validatorPromises.length) {
          validationDone(true);
        } else {
          $q.all(validatorPromises).then(function() {
            validationDone(allValid);
          }, angular.noop);
        }

      }

      /**
       * Places the named id in the appropriate set (ctrl.pnd .error or .success)
       * and updates the ctrl.valid .invalid .pending appropriately
       *
       * @param name
       * @param isValid
       */
      function setValidity(name, isValid) {
        if (localValidationRunId === currentValidationRunId) {
          if (angular.isUndefined(isValid)) {
            set(ctrl.pnd, name);
          } else {
            unset(ctrl.pnd, name);
          }
          if (!isBoolean(isValid)) {
              unset(ctrl.error, name);
              unset(ctrl.success, name);
          } else {
            if (isValid) {
              unset(ctrl.error, name);
              set(ctrl.success, name);
            } else {
              set(ctrl.error, name);
              unset(ctrl.success, name);
            }
          }

          ctrl.pending = isObjectEmpty(ctrl.pnd);
          if (ctrl.pending) {
            ctrl.valid = ctrl.invalid = undefined;
          } else {
            ctrl.valid = isObjectEmpty(ctrl.error);
            ctrl.invalid = !ctrl.valid;
          }
        }
      }

      function validationDone(allValid) {
        if (localValidationRunId === currentValidationRunId) {
          console.log("Validation completed with state:" + allValid);
          // doneCallback(allValid);
        }
      }
    }

    // var vm = this;
    // vm.doseInput = "";
    // vm.onChange = onChange;
    //
    // vm.MedValidationRule = MedValidationRule;
    //
    // vm.getWarning = getWarning;
    // vm.getWarningClass = getWarningClass;
    // vm.checkValidity = checkValidity;
    // vm.validator = validator;

    // vm.warning = new medservice.Warning(0, '');

    ///////////
    function MedValidationRule(context) {
      this.state = context.initialState || PENDING;
      this.rangeLow = context.rangeLow;
      this.rangeHi = context.rangeHi;
      this.failTemplate = context.failTemplate || "<div>validation rule failed</div>";
      this.asyncValidator = context.asyncValidator;
    }

    function initialize() {
      var range;
      for (var i = 0; i < ctrl.med.rangeList.length; i++) {
        range = ctrl.med.rangeList[i];

        ctrl.asyncValidators["range_" + i] = new MedValidationRule(
          {
            rangeLow: range.low,
            rangeHi: range.hi,
            failTemplate: "<div>Dosing validation rule failed </div>",
            asyncValidator: function() {
              return $q(function (resolve, reject) {
                console.log("RangeLow:" + range.low + " RangeHi:" + range.hi);
                
                if (ctrl.mgkg >= range.low && ctrl.mgkg <= range.hi) {
                  resolve();
                } else {
                  reject();
                }
              })
            }
          }
        )



      }




    }



    function validator() {
      var val = this;
      var cachedMg = 0;

      val.getState = getState;






    }

    function getWarning() {
      return medservice.checkRange(vm.mgkg, vm.med);
    }

    function checkValidity() {
      console.log("current dose: " + vm.mg + "mg");

      return ctrl.valid;
    }

    function getWarningClass(lvl) {
      switch (lvl) {
        case 1:
          return "warning";
        case 2:
          return "critical";
        default:
          return "";
      }
    }

    function onChange(source) {
      switch (source) {
        case 'mg':
          ctrl.mgkg = ctrl.mg/ctrl.pt.weight.value;
          break;
        case 'mgkg':
          ctrl.mg = ctrl.mgkg * ctrl.pt.weight.value;
          break;
      }

      ctrl.runValidators();
    }

  }

  function isObjectEmpty(obj) {
    if (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
    }
    return true;
  }

  function isPromiseLike(obj) {
    return obj && (typeof obj.then === 'function');
  }

  function isBoolean(obj) {
    return typeof obj === "boolean"
  }


})();

