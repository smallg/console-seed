'use strict';

/**
 * @ngdoc overview
 * @name smallgWebappSeedApp
 * @description
 * # smallgWebappSeedApp
 *
 * Main module of the application.
 */
angular
  .module('smallgWebappSeedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
