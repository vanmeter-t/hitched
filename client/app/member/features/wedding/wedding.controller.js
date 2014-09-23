'use strict';

angular.module('HitchedApp')
  .controller('WeddingCtrl', function($scope, $location, $modal, $log, Auth, WeddingInfo) {
    $scope.errors = {};
    $scope.submitted = false;
    $scope.editWedding = false;

    // Get the wedding information
    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      WeddingInfo.userWedding(user.wedding).$promise.then(function(data) {
        $scope.wedding = data;
      });
    });

    // Switch to edit mode
    $scope.editWeddingInit = function() {
      $scope.editWedding = !$scope.editWedding;
    };

    // Save the wedding information
    $scope.saveWedding = function(form) {
      $log.info('Saving Wedding');
      $scope.submitted = true;

      if (form.$valid) {
        WeddingInfo.update($scope.wedding).then(function() {

          $scope.submitted = false;
          $scope.editWedding = false;

          var modalInstance = $modal.open({
            templateUrl: 'components/alert/alert.html',
            controller: 'AlertCtrl',
            backdrop: false,
            windowClass: 'hitched-modal'
          });

          modalInstance.result.then(function(result) {
            if (result && result.template) {
              $scope.open(result.template, result.ctrl);
            }
          }, function() {
            $log.info('Modal dismissed at: ' + new Date());
          });

        }).catch(function(err) {
          err = err.message;
          $scope.errors.other = err.message;
        });
      }
    };
  });