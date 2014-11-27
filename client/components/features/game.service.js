'use strict';

angular.module('HitchedApp')
    .factory('Game', function($resource) {
        return $resource('/api/game/:id', {
            id: '@_id'
        });
    })
    .factory('GameInfo', function GameInfo($q, Auth, Game) {
        return {

            /**
             * Upsert game
             *
             * @param  {Object}   gameObj  - game object
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(gameObj, callback) {
                var cb = callback || angular.noop;
                return Game.save(gameObj, function(newGame) {
                    Auth.linkGames(newGame).then(function() {
                        console.log('game saved, updated user games');
                        return cb();
                    });
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Remove game
             *
             * @param  {Object}   gameObj  - game object
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            remove: function(gameObj, callback) {
                var cb = callback || angulary.noop;
                return Game.delete(gameObj, function() {
                    Auth.removeGame(gameObj).then(function() {
                        console.log('game removed, updated user games');
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
                    }, function(err) {

                    }).$promise);
                }

                var promise = $q.all(allPromises);

                promise.then(function() {
                    deferred.resolve(userGames);
                });

                return deferred;
            }
        };
    });