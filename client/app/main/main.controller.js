'use strict';

angular.module('HitchedApp')
  .controller('MainCtrl', function($scope, $location) {
    // Add action for the 'scrollTop' element 
    $scope.scrollTop = function() {
      $location.hash('/');
      $('body').animate({
        scrollTop: 0
      }, 'slow');
    };
  })
  .controller('ContactCtrl', function($scope, $location, ContactUs) {
    $scope.errors = {};
    $scope.emailSent = false;

    $scope.contact = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        ContactUs.sendEmail(form)
          .then(function() {
            // Email Sent
            $scope.emailSent = true;
            $scope.errors.result = 'Thanks for contacting us!';
          })
          .catch(function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };
  });