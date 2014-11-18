'use strict';

angular.module('HitchedApp')
    .factory('Game', function($resource) {
        return $resource('/api/game/:id', {
            id: '@_id'
        });
    })
    .factory('GameInfo', function GameInfo($location, $rootScope, $q, Game, Auth) {
        return {

            /**
             * Upsert game
             *
             * @param  {Object}   game  - game info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(updateGame, callback) {
                var cb = callback || angular.noop;

                return Game.save(updateGame, function(newGame) {
                    console.log('game saved, update user');

                    console.log(newGame);
                    Auth.linkGames(newGame).then(function() {
                        console.log('game added to user.');
                        return cb();
                    });

                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on user's wedding
             *
             * @param  {Array} gameIds - list of IDs for all games associated to the user
             * @return {Object} userGames - array of games for user
             */
            userGames: function(gameIds) {
                var deferred = $q.defer();

                var userGames = [];
                var allPromises = [];
                for (var i = 0; i < gameIds.length; i++) {
                    allPromises.push(Game.get({
                        id: gameIds[i]
                    }, function(gameObj) {
                        userGames.push(gameObj);
                    }, function(err){

                    }).$promise);
                }

                var promise = $q.all(allPromises);

                promise.then(function(){
                    deferred.resolve(userGames);
                });

                return deferred;
            }
        };
    });