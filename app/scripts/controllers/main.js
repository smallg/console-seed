'use strict';

/**
 * @ngdoc function
 * @name smallgWebappSeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smallgWebappSeedApp
 */
angular.module('smallgWebappSeedApp')
    .controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });