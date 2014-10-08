'use strict';

angular.module('HitchedApp')
  .controller('GamesCtrl', function($scope, $location, $modal, $log, Auth, GameInfo) {
    $scope.errors = {};
    $scope.submitted = false;
    $scope.games = [];
  
    // Get the user information
    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      $scope.games = user.games;
    });

    
  });