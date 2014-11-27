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

        // Load the wedding information into the scope
        $scope.wedding = data;
      });
    });

    // Switch to edit mode
    $scope.editWeddingInit = function() {
      $scope.editWedding = true;
    };

    // Cancel out of edit mode
    $scope.cancelWeddingInit = function(){
      $scope.editWedding = false;
    }

    // TODO: Encode the information before passing it across?

    // Save the wedding information
    $scope.saveWedding = function(form) {
      $log.info('Saving Wedding');
      $scope.submitted = true;

      if (form.$valid) {
        WeddingInfo.update($scope.wedding).then(function() {

          $scope.submitted = false;
          $scope.editWedding = false;

          // TODO: how to modify modal template?
          // $scope.modalTitle = 'Success!';
          // $scope.modalBody = 'Your wedding details have been saved!';
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