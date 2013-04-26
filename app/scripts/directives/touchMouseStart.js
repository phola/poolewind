'use strict';

angular.module('poolewindApp')
  .directive('touchMouseStart', function () {
    return function(scope, element, attrs) {
    // debugger;
    element.bind('touchstart', function() {
      scope.$apply(attrs['touchMouseStart']);
    });
     element.bind('mouseover', function() {
     	scope.$apply(attrs['touchMouseStart']);
    });
  };
  });

  angular.module('poolewindApp')
  .directive('touchMouseEnd', function () {
    return function(scope, element, attrs) {
    // debugger;
    element.bind('touchend', function() {
      scope.$apply(attrs['touchMouseStart']);
    });
     element.bind('mouseout', function() {
     	scope.$apply(attrs['touchMouseEnd']);
    });
  };
  });
