'use strict';

angular.module('poolewindApp')
    .controller('RootCtrl', ['$scope', 'angularFire',  'angularFireCollection',function ($scope, angularFire, angularFireCollection) {
            //.controller('RootCtrl', ['$scope',function ($scope) {
        

        var h = function (index, options, content) {
                  var row = options.data[index];
                  //$scope.weather = {d:parseInt(row.d), s:parseFloat(row.s).toFixed(2), t:row.t};
                  //debugger;
                  $scope.weather = {d:Math.round(parseFloat(row.d)), s:Math.round(parseFloat(row.s)), t:row.t};
                  if(!$scope.$$phase) {
                    $scope.$apply();
                  }
                  return row.s;
                };
       
        $scope.morrisConfig = { xkey: 't',
                  ykeys: ['s'],//, 'g'],
                  labels: ['Speed'],//, 'Gust']
                  hoverCallback: h,
                  lineColors:['#E8E8E8']
         //         ,
         //       dateFormat: function (x) { debugger;return new Date(x).toDateString(); }
                };

 var url = 'https://wind.firebaseio.com/poole/log',
    url2 = 'https://wind.firebaseio.com/poole/hlog';
     
        $scope.firehose = angularFireCollection(new Firebase(url).limit(60));
        $scope.firehose2 = angularFireCollection(new Firebase(url2).limit(60)); 


        $scope.testData = [
        {d:159, s:1.8, t:1375850399776},
{d:159, s:1.8, t:1375850417576},
{d:159, s:1.8, t:1375850425587},
{d:159, s:1.9, t:1375850435608},
{d:159, s:2.1, t:1375850447608},
{d:159, s:2.4, t:1375850455607},
{d:159, s:2.7, t:1375850468616},
{d:159, s:2.7, t:1375850476679},
{d:159, s:2.8, t:1375850486629}];

        $scope.weather = {d:159, s:'loading..', t:1375850399776};

         $scope.$watch('weather', function(a) {
                   //  debugger;
                }); 

    }]);