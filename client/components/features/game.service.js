'use strict';

angular.module('HitchedApp')
  .factory('Game', function($resource) {
    return $resource('/api/game/:id', {
      id: '@_id'
    });
  })
  .factory('GameInfo', function GameInfo($location, $rootScope, Game, User) {
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

        return Game.save(updateGame, function(game) {

          // update the current user with the new game
          var currentUser = User.get();
          currentUser.addGame(game);

          return cb();
        }, function(err) {

          return cb(err);
        }).$promise;
      }

    };
  });