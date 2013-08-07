'use strict';

angular.module('poolewindApp', ['firebase',
  'ng-iscroll', 'ng-morris'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/2', {
        templateUrl: 'views/root.html',
        controller: 'RootCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
