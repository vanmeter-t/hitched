'use strict';

angular.module('HitchedApp')
    .controller('GamesCtrl', function($scope, $location, $modal, $log, Auth, GameInfo) {
        $scope.errors = {};
        $scope.submitted = false;
        $scope.games = [];

        // Get the user information
        Auth.getCurrentUser().$promise.then(function(user) {
            $scope.user = user;
            $scope.userGames = user.games;
        });

        $scope.currGame = '';
        $scope.currGameSrc = '';

        // Games
        $scope.games = [{
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
        }];

        $scope.selectGame = function(template) {
            $scope.currGame = template;
            $scope.currGameSrc = 'app/member/features/games/' + $scope.currGame;
        };
    })
    .controller('ScavengerCtrl', function($scope, $location, $modal, $log, Auth, GameInfo) {
        /******************************************************
         * Scavenger Hunt
         ******************************************************/

        var lastClueId = 1;
        $scope.hideAddClue = false;

        $scope.scavenger = {
            items: []
        };

        $scope.newItem = {
            type: '',
            instruction: '',
            clues: [{
                id: 1,
                clue: ''
            }]
        };

        $scope.addItem = function() {
            $scope.hideAddClue = false;
            $scope.scavenger.items.push($scope.newItem);
            $scope.newItem = {
                type: '',
                instruction: '',
                clues: [{
                    id: 1,
                    clue: ''
                }]
            };
        };

        $scope.addClue = function() {
            lastClueId++;

            $scope.newItem.clues.push({
                id: lastClueId,
                clue: ''
            });

            // maximum of 3 clues
            if (lastClueId === 3) {
                $scope.hideAddClue = true;
            }
        };
    });;