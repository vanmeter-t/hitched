'use strict';

angular.module('HitchedApp')
  .controller('DashboardCtrl', function($scope) {

    $scope.currFeature = 'wedding';
    $scope.currFeatureSrc = 'app/member/features/' + $scope.currFeature + '/' + $scope.currFeature;

    // App features
    $scope.features = [{
      'title': 'Wedding Info',
      'template': 'wedding',
      'img': ''
    }, {
      'title': 'Games',
      'template': 'games',
      'img': ''
    }, {
      'title': 'Photos',
      'template': 'photos',
      'img': ''
    }, {
      'title': 'Guests',
      'template': 'guests',
      'img': ''
    }, {
      'title': 'Customize App',
      'template': 'customize',
      'img': ''
    }];

    $scope.selectFeature = function(template) {
      $scope.currFeature = template;
      $scope.currFeatureSrc = 'app/member/features/' + $scope.currFeature + '/' + $scope.currFeature;
    };
  });