'use strict';

angular.module('poolewindApp')
    .controller('RootCtrl', ['$scope', 'angularFire',  'angularFireCollection',function ($scope, angularFire, angularFireCollection) {
       
        $scope.morrisConfig = { xkey: 't',
                  ykeys: ['s'],//, 'g'],
                  labels: ['Speed']//, 'Gust']
         //         ,
         //       dateFormat: function (x) { debugger;return new Date(x).toDateString(); }
                };

 var url = 'https://wind.firebaseio.com/poole/log',
    url2 = 'https://wind.firebaseio.com/poole/hlog';
     
        $scope.firehose = angularFireCollection(new Firebase(url).limit(60));
        $scope.firehose2 = angularFireCollection(new Firebase(url2).limit(5));      

    }]);