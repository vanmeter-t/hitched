'use strict';

angular.module('HitchedApp')
    .controller('AnagramCtrl', function($scope, $location, $modal, $log, Auth, GameInfo) {
        /******************************************************
         * Anagram
         ******************************************************/
        
        $scope.anagram = {};
        $scope.submitted = false;

        // TODO: Encode the information before passing it across
        $scope.saveAnagram = function() {
            $log.info('Saving Anagram');
            $scope.submitted = true;

            var updateGame = {
                type: 'Anagram',
                gameInfo: $scope.anagram
            };

            GameInfo.update(updateGame).then(function() {

                $scope.submitted = false;

                // TODO: how to modify modal template?
                // $scope.modalTitle = 'Success!';
                // $scope.modalBody = 'Your anagram game has been saved!';
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