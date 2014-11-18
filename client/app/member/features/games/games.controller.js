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

    })
    .controller('ScavengerCtrl', function($scope, $location, $modal, $log, Auth, GameInfo) {
        /******************************************************
         * Scavenger Hunt
         ******************************************************/
        $scope.clueIdx = 0;
        $scope.hideAddClue = false;
        $scope.submitted = false;

        $scope.scavenger = {
            items: []
        };

        $scope.newItem = {
            type: '',
            instruction: '',
            answer: '',
            clues: [{
                clue: ''
            }]
        };

        $scope.addItem = function(form) {            
            if (form.$valid) {
                $scope.clueIdx = 0;
                $scope.scavenger.items.push($scope.newItem);
                $scope.newItem = {
                    type: '',
                    instruction: '',
                    answer: '',
                    clues: [{
                        clue: ''
                    }]
                };
            }
        };

        $scope.addClue = function() {
            ++$scope.clueIdx;
            $scope.newItem.clues.push({ clue: ''});
        };

        $scope.editItem = function(index){

        };

        $scope.deleteItem = function(index){

        };

        // TODO: Encode the information before passing it across
        $scope.saveScavengerHunt = function() {
            $log.info('Saving Scavenger Hunt');
            $scope.submitted = true;

            var updateGame = {
                type: 'ScavengerHunt',
                gameInfo: $scope.scavenger
            };

            GameInfo.update(updateGame).then(function() {

                $scope.submitted = false;

                // TODO: how to modify modal template?
                // $scope.modalTitle = 'Success!';
                // $scope.modalBody = 'Your scavenger hunt has been saved!';
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
        };

    });