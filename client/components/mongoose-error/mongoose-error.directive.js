'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('HitchedApp')
  .directive('mongooseError', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  })
  .directive('passwordMatch', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var password = '#' + attrs.passwordMatch;
        $(element).add(password).on('keyup', function() {
          scope.$apply(function() {
            ngModel.$setValidity('noMatch', element.val() === $(password).val());
          });
        });
      }
    };
  });