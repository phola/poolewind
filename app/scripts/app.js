'use strict';

angular.module('poolewindApp', ['firebase',
  'ng-iscroll', 'ng-morris'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/original', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
       .when('/cssslide', {
        templateUrl: 'views/root.html',
        controller: 'RootCtrl'
      })
      .when('/', {
        templateUrl: 'views/base.html',
        controller: 'RootCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


// window.onload = function () {
//      var slideMenuButton = document.getElementById('slide-menu-button');
//     slideMenuButton.onclick = function (e) {
//         var cl = document.body.classList;
//         if (cl.contains('left-nav')) {
//             cl.remove('left-nav');
//         } else {
//             cl.add('left-nav');
//         }
//     };
//}