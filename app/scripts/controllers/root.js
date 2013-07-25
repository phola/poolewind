'use strict';

angular.module('poolewindApp')
    .controller('RootCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {

        $scope.headerText = 'Morris!';


        var url = 'https://wind.firebaseio.com/poole/weather/12',
            promise = angularFire(url, $scope, 'firehose', {});

        $scope.morrisConfig = { xkey: 't',
                  ykeys: ['s', 'g'],
                  labels: ['Speed', 'Gust']
     //             ,
     //            dateFormat: function (x) { return new Date(x).toDateString(); }
                };


        $scope.$watch('firehose', function(r) {
                    var log = [];
                    angular.forEach(r, function(value, key){
                               this.push(angular.extend(value, {t: parseInt(key)}));
                    }, log);
                     $scope.data = log;
        });

        $scope.data = [];
       

    }]);