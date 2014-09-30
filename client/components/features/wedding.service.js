'use strict';

angular.module('HitchedApp')
  .factory('Wedding', function($resource) {
    return $resource('/api/wedding/:id', {
      id: '@_id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      }
    });
  })
  .factory('WeddingInfo', function WeddingInfo($location, $rootScope, Wedding) {
    return {

      /**
       * Upsert wedding
       *
       * @param  {Object}   wedding  - wedding info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      update: function(updateWedding, callback) {
        var cb = callback || angular.noop;

        return Wedding.update(updateWedding, function() {

          return cb();
        }, function(err) {

          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on user's wedding
       *
       * @param  {Number} id - wedding id for current user
       * @return {Object} wedding - wedding info
       */
      userWedding: function(id) {
        return Wedding.get({
          id: id
        });
      }

    };
  });