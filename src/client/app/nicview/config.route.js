(function () {
    'use strict';

    /* @ngInject */
    angular
        .module('app.nicview')
        .config(['$routeProvider', routeProvider]);

    /* @ngInject */
    function routeProvider($routeProvider) {
        $routeProvider.when('/nicview', getConfig());
    }

    function getConfig() {
        return {
            templateUrl: 'app/nicview/nicview.html'
        };
    }
})
();