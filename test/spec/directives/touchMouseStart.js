'use strict';

describe('Directive: touchMouseStart', function () {
  beforeEach(module('poolewindApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<touch-mouse-start></touch-mouse-start>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the touchMouseStart directive');
  }));
});
