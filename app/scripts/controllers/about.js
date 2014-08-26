'use strict';

/**
 * @ngdoc function
 * @name smallgWebappSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the smallgWebappSeedApp
 */
angular.module('smallgWebappSeedApp')
    .controller('AboutCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
