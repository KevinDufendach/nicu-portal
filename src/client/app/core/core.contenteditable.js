/**
 * Created by REIR8P on 8/25/2016.
 */

(function () {
  'use strict';

  angular.module('app')
    .directive("contenteditable", ContentEditable);

  // http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/editing-text-in-place-using-html5-content-editable.html
  function ContentEditable() {
    return {
      restrict: "A",
      require: "ngModel",
      link: function (scope, element, attrs, ngModel) {
        function read() {
          ngModel.$setViewValue(element.html());
        }

        ngModel.$render = function () {
          element.html(ngModel.$viewValue || "");
        };

        element.bind("blur keyup change", function () {
          scope.$apply(read);
        });
      }
    }
  }

})();