/**
 * Created by Kevin on 12/5/2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('limitChars', limitCharsDirective);

  function limitCharsDirective($sanitize, $compile) {
    var directive = {
      restrict: "E",
      priority: 100,
      scope: {
        content: '=',
        maxLength: '=',
        delimiter: '=',
        showDetails: '='
      },
      link: link,
      template: '',
      controller: LimitCharsCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function LimitCharsCtrl($scope) {
      var vm = this;

      vm.toggleDetails = function( set ) {
        console.log("ShowDetails currently: " + $scope.showDetails);
        $scope.showDetails = set || !$scope.showDetails;
        console.log("ShowDetails changed to: " + $scope.showDetails);
      }


    }


    function link (scope, elem, attr, ctrl) {
      // scope.resultText = LimitChars(elem, 50);
      // scope.resultText = "Sed condimentum nibh et augue";
      scope.resultText = elem[0].innerHTML;
      scope.$watch('vm.content', function (value) {
        elem.html(LimitChars(value, ctrl.maxLength, ctrl.delimiter, scope));
      });

    }

    function LimitChars(text, maxLength, char, scope) {
      var limitCharsMinErr = angular.$$minErr('limitChars');
      var isString = angular.isString;


      if (text == null || text === '') return text;
      if (!isString(text)) throw limitCharsMinErr('notstring', 'Expected string but received: {0}', text);

      var html = [];

      maxLength = maxLength || 50;
      char = char || " ";

      if (text.length <= maxLength) return sanitizeText(text);

      //trim the string to the maximum length
      var beginning = text.substr(0, maxLength);

      //re-trim if we are in the middle of a word
      beginning = beginning.substr(0, Math.min(beginning.length, beginning.lastIndexOf(char)));

      var ending = text.substr(beginning.length + 1);

      addText(beginning);

      var newEl = angular.element('<button href="#" ng-click="console.log(\'clicked\')">[...]</button>');
      $compile(newEl)(scope);

      html.push(newEl[0].outerHTML);
      addText(ending);

      return html.join('');


      function addText(text) {
        if (!text) {
          return;
        }
        html.push(sanitizeText(text));
      }

      function sanitizeText(text) {
        return $sanitize(text);
      }
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