'use strict';

angular.module('HitchedApp')
  .controller('SettingsCtrl', function($scope, $modalInstance, User, Auth) {
    $scope.errors = {};
    $scope.emailSubmitted = false;
    $scope.passwordSubmitted = false;

    $scope.close = function() {
      $modalInstance.close();
    };

    $scope.editEmail = false;
    $scope.editEmailInit = function() {
      $scope.editEmail = !$scope.editEmail;
    };

    $scope.editPassword = false;
    $scope.editPasswordInit = function() {
      $scope.editPassword = !$scope.editPassword;
    };

    $scope.changeEmail = function(form) {
      $scope.emailSubmitted = true;

      if (form.$valid) {
        Auth.changeEmail($scope.currentUser.email)
          .then(function() {
            $scope.message = 'Email updated.';
            $scope.editEmail = false;
          })
          .catch(function(err) {
            form.email.$setValidity('mongoose', false);
            $scope.errors.other = 'Issue with email';
            $scope.message = '';
          });
      }
    };

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.currentUser.password, $scope.currentUser.newPassword)
          .then(function() {
            $scope.message = 'Password successfully changed.';
            $scope.editPassword = false;
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });