Morris.Line.prototype._drawPointFor=function(t){var e,o,i,r,n,a;for(this.seriesPoints[t]=[],n=this.data,a=[],i=0,r=n.length;r>i;i++)o=n[i],e=null,null!=o._y[t]&&(e=this.drawLinePoint(o._x,o._y[t],this.options.pointSize,this.colorFor(o,t,"point"),t,i)),a.push(this.seriesPoints[t].push(e));return a},Morris.Line.prototype.drawLinePoint=function(t,e,o,i,r,n){var a=this.options.data[n];return this.raphael.circle(t,e,o).attr("fill","orange").attr("stroke-width",this.strokeWidthForSeries(r)).attr("stroke",this.strokeForSeries(r)).node.setAttribute("class","p"+parseInt(a.s))},angular.module("poolewindApp",["firebase","ng-iscroll","ng-morris"]).config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/2",{templateUrl:"views/root.html",controller:"RootCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("poolewindApp").controller("MainCtrl",["$scope","angularFire",function(t,e){var o="https://poolewind.firebaseio.com/weather",i=e(o,t,"live",{});t.weather={},t.pauseLiveUpdate=!1,t.$watch("live",function(){t.pauseLiveUpdate||angular.extend(t.weather,t.live)}),o="https://poolewind.firebaseio.com/history",i=e(o,t,"history",{}),t.showHistory=function(e){t.pauseLiveUpdate=!0,angular.extend(t.weather,t.history[e])},t.showLive=function(){t.pauseLiveUpdate=!1,angular.extend(t.weather,t.live)}}]),angular.module("poolewindApp").controller("RootCtrl",["$scope","angularFire","angularFireCollection",function(t,e,o){var i=function(e,o){var i=o.data[e];return t.weather={d:parseInt(i.d),s:parseInt(i.s),t:i.t},i.s};t.morrisConfig={xkey:"t",ykeys:["s"],labels:["Speed"],hoverCallback:i,lineColors:["#E8E8E8"]};var r="https://wind.firebaseio.com/poole/log",n="https://wind.firebaseio.com/poole/hlog";t.firehose=o(new Firebase(r).limit(260)),t.firehose2=o(new Firebase(n).limit(50)),t.testData=[{d:159,s:1.8,t:1375850399776},{d:159,s:1.8,t:1375850417576},{d:159,s:1.8,t:1375850425587},{d:159,s:1.9,t:1375850435608},{d:159,s:2.1,t:1375850447608},{d:159,s:2.4,t:1375850455607},{d:159,s:2.7,t:1375850468616},{d:159,s:2.7,t:1375850476679},{d:159,s:2.8,t:1375850486629}],t.weather=t.testData[0],t.$watch("weather",function(){})}]),angular.module("poolewindApp").directive("windBar",function(){return{template:'<div class="windbar-wrap" touch-mouse-start="startHandler()" touch-mouse-end="endHandler()"><div class="windbar k{{Math.round(data.AvgSpeed)}}" style="margin-top:{{barHeight-(data.AvgSpeed*(barHeight/limit))}}px;height:{{data.AvgSpeed*(barHeight/limit)}}px"><div class="detail mini_arrow_box">{{data.AvgSpeed}}</div></div><div class="timestamp k{{Math.round(data.AvgSpeed)}}">{{data.TimeStamp}}</div></div>',scope:{data:"=data",limit:"=limit",startHandler:"&touchMouseStart",endHandler:"&touchMouseEnd"},link:function(t,e){t.Math=window.Math,t.barHeight=e[0].children[0].children[0].clientHeight}}}),angular.module("ng-iscroll",[]).directive("ngIscroll",function(){return{replace:!1,restrict:"A",link:function(t,e,o){function i(){new iScroll(document.getElementById("wrapper"),{nap:!0,momentum:!0,hScrollbar:!1})}var r=5;""!==o.ngIscroll&&(r=o.ngIscroll),t.$watch(o.ngIscroll,function(){setTimeout(i,r)})}}}),angular.module("ng-morris",[]).directive("ngMorris",function(){return{restrict:"A",scope:{config:"=config",model:"=ngModel"},link:function(t,e){var o=angular.extend({element:e,data:t.model},t.config);Morris&&(t.graph=Morris.Line(o),t.$watchCollection("model",function(){t.graph.setData(t.model)}))}}}),angular.module("poolewindApp").directive("touchMouseStart",function(){return function(t,e,o){e.bind("touchstart",function(){t.$apply(o.touchMouseStart)}),e.bind("mouseover",function(){t.$apply(o.touchMouseStart)})}}),angular.module("poolewindApp").directive("touchMouseEnd",function(){return function(t,e,o){e.bind("touchend",function(){t.$apply(o.touchMouseStart)}),e.bind("mouseout",function(){t.$apply(o.touchMouseEnd)})}});