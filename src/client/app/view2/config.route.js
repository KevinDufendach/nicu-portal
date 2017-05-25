(function () {
    'use strict';

    /* @ngInject */
    angular
        .module('app.view2')
        .config(['$routeProvider', routeProvider]);

    /* @ngInject */
    function routeProvider($routeProvider) {
        $routeProvider.when('/view2', getConfig());
    }

    function getConfig() {
        return {
            templateUrl: '/app/view2/view2.html'
        };
    }
})
();