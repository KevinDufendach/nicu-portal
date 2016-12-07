/**
 * Created by Kevin on 12/5/2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('limitChars', limitCharsDirective);

  function limitCharsDirective() {
    var isUndefined = angular.isUndefined;

    var directive = {
      restrict: "E",
      priority: 100,
      scope: {
        content: '@',
        maxLength: '@',
        delimiter: '@',
        showDetails: '=?',
        moreText: '@',
        allowShowLess: '=?',
        lessText: '@'
      },
      // template: '<span ng-click="console.log(\'clicked\'")>clickme</span>',
      templateUrl: '/js/core/limit_chars.template.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function controller() {
      var vm = this;

      // if (!isDefined(vm.maxLength)) vm.maxLength = 140;
      if (isUndefined(vm.maxLength)) vm.maxLength = 140;
      if (isUndefined(vm.delimiter)) vm.delimiter = ' ';
      if (isUndefined(vm.showDetails)) vm.showDetails = false;
      if (isUndefined(vm.moreText)) vm.moreText = 'more';
      if (isUndefined(vm.lessText)) vm.lessText = 'less';
      if (isUndefined(vm.allowShowLess)) vm.allowShowLess = true;
      vm.shouldTruncate = false;

      // vm.maxLength = vm.maxLength || 140;
      // vm.delimiter = vm.delimiter || ' ';
      // vm.showDetails = vm.showDetails || false;
      // vm.moreText = vm.moreText || 'more';
      // vm.lessText = vm.lessText || 'less';
      // vm.allowShowLess = vm.allowShowLess || true;
      // vm.shouldTruncate = false;

      var splitResult = splitByLimit(vm.content, vm.maxLength, vm.delimiter);

      vm.pretext = splitResult[0];

      if (splitResult.length > 1) {
        vm.posttext = splitResult[1];
        vm.shouldTruncate = true;
      }
      // vm.posttext = vm.content;
    }

    function splitByLimit(text, maxLength, delimiter) {
      var limitCharsMinErr = angular.$$minErr('limitChars');
      var isString = angular.isString;


      if (text == null || text === '') return text;
      if (!isString(text)) throw limitCharsMinErr('notstring', 'Expected string but received: {0}', text);

      var splitResult = [];

      if (text.length <= maxLength) {
        splitResult.push(text);
        return splitResult;
      }

      //trim the string to the maximum length
      var beginning = text.substr(0, maxLength - 1);

      //re-trim if we are in the middle of a word
      beginning = beginning.substr(0, Math.min(beginning.length, beginning.lastIndexOf(delimiter)) + 1);

      var ending = text.substr(beginning.length);

      splitResult.push(beginning);
      splitResult.push(ending);

      return splitResult;
    }
  }



  // function LimitChars(input, maxLength, char) {
  //   if (!input || 0 === input.length) return input;
  //
  //   maxLength = maxLength || input.length;
  //   char = char || " ";
  //
  //   if (input.length <= maxLength) return input;
  //
  //   //trim the string to the maximum length
  //   var result = input.substr(0, maxLength);
  //
  //   //re-trim if we are in the middle of a word
  //   result = result.substr(0, Math.min(result.length, result.lastIndexOf(char)));
  //
  //   result = result + char;
  //
  //   return result;
  // }


})();