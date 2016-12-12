/**
 * Created by Kevin on 12/5/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.care_team", ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/care_team', {
                templateUrl: 'care_team/care_team.html',
                controller: 'CareTeamCtrl'
            });
        }])

})();