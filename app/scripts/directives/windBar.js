'use strict';

angular.module('poolewindApp')
  .directive('windBar', function ($compile) {
    return {
      template:'<div class="windbar-wrap" touch-mouse-start="startHandler()" touch-mouse-end="endHandler()">' +
      				'<div class="windbar k{{Math.round(data.AvgSpeed)}}" ' +
      				'style="margin-top:{{200-(data.AvgSpeed*(200/limit))}}px;height:{{data.AvgSpeed*(200/limit)}}px">' +
      				'<div class="detail mini_arrow_box">{{data.AvgSpeed}}</div>' +
      				'</div>' +      				
      				'<div class="timestamp k{{Math.round(data.AvgSpeed)}}">{{data.TimeStamp}}</div></div>',
    //   transclude: true,
      scope: {
      		data : '=data',
      		limit: '=limit',
          startHandler: '&touchMouseStart',
          endHandler: '&touchMouseEnd'
      	},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.Math = window.Math;
        //element.append($compile('<li ng-repeat="(name, value) in data">{{name}} : {{value}}</li>')(scope)); 
      }
    };
  });
