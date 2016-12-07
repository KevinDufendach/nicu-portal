/**
 * Created by Kevin on 12/5/2016.
 */
(function() {
  'use strict'

  angular.module('app')
    .filter('limitChars', function() {return LimitChars});

  function LimitChars(input, maxLength, char) {
    if (!input || 0 === input.length) return input;

    maxLength = maxLength || input.length;
    char = char || " ";

    if (input.length <= maxLength) return input;

    //trim the string to the maximum length
    var result = input.substr(0, maxLength);

    //re-trim if we are in the middle of a word
    result = result.substr(0, Math.min(result.length, result.lastIndexOf(char)));

    result = result + char  + '[...]';

    return result;
  }

})();