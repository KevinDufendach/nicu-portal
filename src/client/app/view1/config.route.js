(function () {
    'use strict';

    /* @ngInject */
    angular
        .module('app.view1')
        .config(['$routeProvider', routeProvider]);

    /* @ngInject */
    function routeProvider($routeProvider) {
        $routeProvider.when('/view1', getConfig());
    }

    function getConfig() {
        return {
            templateUrl: '/app/view1/view1.html'
        };
    }
})
();