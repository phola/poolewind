'use strict';

describe('Directive: windBar', function () {
  beforeEach(module('poolewindApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<wind-bar></wind-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the windBar directive');
  }));
});
