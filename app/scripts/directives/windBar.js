'use strict';

angular.module('poolewindApp')
    .directive('windBar', function () {
        return {
            template: '<div class="windbar-wrap" touch-mouse-start="startHandler()" touch-mouse-end="endHandler()">' + '<div class="windbar k{{Math.round(data.AvgSpeed)}}" ' + 'style="margin-top:{{barHeight-(data.AvgSpeed*(barHeight/limit))}}px;height:{{data.AvgSpeed*(barHeight/limit)}}px">' + '<div class="detail mini_arrow_box">{{data.AvgSpeed}}</div>' + '</div>' + '<div class="timestamp k{{Math.round(data.AvgSpeed)}}">{{data.TimeStamp}}</div></div>',
            //   transclude: true,
            scope: {
                data: '=data',
                limit: '=limit',
                startHandler: '&touchMouseStart',
                endHandler: '&touchMouseEnd'
            },
            link: function postLink(scope, element) {
                scope.Math = window.Math;
                scope.barHeight = element[0].children[0].children[0].clientHeight;
            }
        };
    });