'use strict';

angular.module('poolewindApp')
    .controller('MainCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {

        var url = 'https://poolewind.firebaseio.com/weather',
            promise = angularFire(url, $scope, 'live', {});

        $scope.weather = {};
        $scope.pauseLiveUpdate = false;

        $scope.$watch('live', function (value) {
            debugger;
            if (!$scope.pauseLiveUpdate) {
                angular.extend($scope.weather, $scope.live);
            }
        });

        url = 'https://poolewind.firebaseio.com/history';
        promise = angularFire(url, $scope, 'history', {});

        $scope.showHistory = function (hour) {
            $scope.pauseLiveUpdate = true;
            angular.extend($scope.weather, $scope.history[hour]);
        };

        $scope.showLive = function () {
            $scope.pauseLiveUpdate = false;
            //kickstart
            angular.extend($scope.weather, $scope.live);
        };

    }]);