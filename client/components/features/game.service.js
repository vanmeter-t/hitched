'use strict';

angular.module('HitchedApp')
  .factory('Game', function($resource) {
    return $resource('/api/game/:id', {
      id: '@_id'
    });
  })
  .factory('GameInfo', function GameInfo($location, $rootScope, Game) {
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

        return Game.save(updateGame, function() {

          return cb();
        }, function(err) {

          return cb(err);
        }).$promise;
      }

    };
  });