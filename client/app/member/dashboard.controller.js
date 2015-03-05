'use strict';

angular.module('HitchedApp')
  .controller('DashboardCtrl', function($scope) {

    $scope.currFeature = 'welcome';
    $scope.currFeatureSrc = 'app/member/features/' + $scope.currFeature + '/' + $scope.currFeature;

    // App features
    $scope.features = [{
      'title': 'Home',
      'template': 'welcome',
      'img': '',
      'class': 'box-primary'
    },{
      'title': 'Wedding Info',
      'template': 'wedding',
      'img': '',
      'class': 'box-primary'
    }, {
      'title': 'Customize App',
      'template': 'customize',
      'img': '',
      'class': 'box-primary'
    }, {
      'title': 'Games',
      'template': 'games',
      'img': '',
      'class': 'box-primary'
    }, {
      'title': 'Photos',
      'template': 'photos',
      'img': '',
      'class': 'box-primary'
    }, {
      'title': 'Guests',
      'template': 'guests',
      'img': '',
      'class': 'box-primary'
    }];

    $scope.selectFeature = function(template) {
      $scope.currFeature = template;
      $scope.currFeatureSrc = 'app/member/features/' + $scope.currFeature + '/' + $scope.currFeature;
    };
  });