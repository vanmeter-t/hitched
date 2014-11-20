'use strict';

angular.module('HitchedApp')
    .controller('GamesCtrl', function($scope, $location, $modal, $log, Auth, GameInfo) {
        $scope.errors = {};
        $scope.submitted = false;
        $scope.gameTypes = [];
        $scope.userGames = [];

        // Get the wedding information
        Auth.getCurrentUser().$promise.then(function(user) {
          $scope.user = user;
          GameInfo.userGames(user.games).promise.then(function(data) {
            $scope.userGames = data;
          });
        });

        $scope.currGame = '';
        $scope.currGameSrc = '';

        // Games
        $scope.gameTypes = [{
            'title': 'Scavenger Hunt',
            'template': 'scavenger',
            'info': 'Find all the items!',
            'class': 'box-info',
            'octicon': 'octicon-search'
        }, {
            'title': 'Crossword Puzzle',
            'template': 'crossword',
            'info': 'Who can complete it first?',
            'class': 'box-success',
            'octicon': 'octicon-puzzle'
        }, {
            'title': 'Wedding Anagram',
            'template': 'anagram',
            'info': 'Can you unscramble the words?',
            'class': 'box-warning',
            'octicon': 'octicon-puzzle'
        }];

        // Fetch the template for the specific game selected
        $scope.selectGame = function(template) {
            $scope.currGame = template;
            $scope.currGameSrc = 'app/member/features/games/' + $scope.currGame;
        };

        $scope.cancelGame = function(){
            $scope.currGame = '';
            $scope.currGameSrc = '';
        };

        $scope.closeGame = function(){
            $scope.currGame = '';
            $scope.currGameSrc = '';
        };

    });