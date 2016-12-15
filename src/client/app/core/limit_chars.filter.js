/**
 * Created by Kevin on 12/5/2016.
 */
// reference: https://github.com/angular/angular.js/blob/master/src/ngSanitize/filter/linky.js#L3

(function () {
  'use strict';

  angular.module('app')
    .filter('limitChars', ['$sanitize', function ($sanitize) {
      var limitCharsMinErr = angular.$$minErr('limitChars');
      var isString = angular.isString;

      return function (text, maxLength, char) {
        if (text == null || text === '') return text;
        if (!isString(text)) throw limitCharsMinErr('notstring', 'Expected string but received: {0}', text);

        var raw = text;
        var html = [];

        maxLength = maxLength || text.length;
        char = char || " ";

        if (text.length <= maxLength) return sanitizeText(text);

        //trim the string to the maximum length
        var beginning = text.substr(0, maxLength);

        //re-trim if we are in the middle of a word
        beginning = beginning.substr(0, Math.min(beginning.length, beginning.lastIndexOf(char)));

        var ending = text.substr(beginning.length + 1);

        addText(beginning);
        html.push('<a href="">[...]</a>');
        addText(ending);

        return $sanitize(html.join(''));

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

    }]);
})();