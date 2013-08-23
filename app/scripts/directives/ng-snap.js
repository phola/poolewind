angular.module('ng-snap', []).directive('ngSnap', function() {
    return {
        template: '<div ng-transclude></div>',
        transclude: true,
        scope: {
            config: '=config',
            snapper: '='
        },
        link: function($scope, element) {           
            var config = angular.extend({
                element: element[0]
            }, $scope.config);
            if (Snap) {
                $scope.snapper =  new Snap(config);               
            }
        }
    };
});