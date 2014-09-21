'use strict';

angular.module('HitchedApp')
  .controller('AlertCtrl', function($scope, $modalInstance) {

    console.log($modalInstance);
    $scope.close = function() {
      console.log($modalInstance);
      $modalInstance.close();
    };
  });