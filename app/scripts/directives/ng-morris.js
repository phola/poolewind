angular.module('ng-morris', []).directive('ngMorris', function() {
    return {
        restrict: 'A',
        scope: {
            config: '=config',
            model: '=ngModel',
            graph: "="
        },
        link: function($scope, element, attrs) {

            var config = angular.extend({
                element: element,
                data: $scope.model,
            }, $scope.config);

            if (Morris) {

                $scope.graph = Morris.Line(config);
                //debugger;

                  // $scope.$watchCollection('model', function() {
                  //       //debugger;
                  //       $scope.graph.setData($scope.model)
                  //   });


               setTimeout(function() {
                    $scope.graph.setData($scope.model)
                    $scope.$watchCollection('model', function() {                      
                        $scope.graph.setData($scope.model)
                    });
               }
               ,1000);

            }
        }
    };
});