(function () {
    'use strict';

    /* @ngInject */
    angular
        .module('app.journey')
        .config(['$routeProvider', routeProvider]);

    /* @ngInject */
    function routeProvider($routeProvider) {
        $routeProvider.when('/journey', getConfig());
    }

    function getConfig() {
        return {
            templateUrl: '/app/journey/journey.html'
        };
    }
})
();