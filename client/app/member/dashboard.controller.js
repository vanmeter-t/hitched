'use strict';

angular.module('HitchedApp') //, ['ngAnimate']
  .controller('DashboardCtrl', function($scope) {

    $scope.idx = 0;
    $scope.currFeature = 'welcome';
    $scope.currFeatureSrc = 'app/member/features/' + $scope.currFeature + '/' + $scope.currFeature;

    // App features
    $scope.features = [
    {
      'title': 'Home',
      'template': 'welcome',
      'img': '',
      'class': 'box-primary',
      'idx': 0
    },
    {
      'title': 'Wedding Info',
      'template': 'wedding',
      'img': '',
      'class': 'box-primary',
      'idx': 1
    }, {
      'title': 'Games',
      'template': 'games',
      'img': '',
      'class': 'box-primary',
      'idx': 2
    }, {
      'title': 'Customize App',
      'template': 'customize',
      'img': '',
      'class': 'box-primary',
      'idx': 3
    },{
      'title': 'Guests',
      'template': 'guests',
      'img': '',
      'class': 'box-primary',
      'idx': 4
    },  {
      'title': 'Photos',
      'template': 'photos',
      'img': '',
      'class': 'box-primary',
      'idx': 5
    }];

    $scope.selectFeature = function(template, idx) {
      $scope.idx = idx;
      $scope.currFeature = template;
      $scope.currFeatureSrc = 'app/member/features/' + $scope.currFeature + '/' + $scope.currFeature;
    };

    $scope.nextFeature = function(){
      var nextIdx = $scope.idx + 1;
      
      if(nextIdx < $scope.features.length){
        var nextFeature = $scope.features[nextIdx];
        $scope.selectFeature(nextFeature.template, nextFeature.idx); 
      }     
    };

    $scope.backFeature = function(){
      var backIdx = $scope.idx - 1;

      if(backIdx > -1){
        var nextFeature = $scope.features[backIdx];
        $scope.selectFeature(nextFeature.template, nextFeature.idx);    
      }
    };

  });