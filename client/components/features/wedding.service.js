'use strict';

angular.module('HitchedApp')
  .factory('Wedding', function($resource) {
    return $resource('/api/wedding/:id', {
      id: '@_id'
    });
  })
  .factory('WeddingInfo', function WeddingInfo(Wedding) {
    return {

      /**
       * Upsert wedding
       *
       * @param  {Object}   updateWedding  - wedding object
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      update: function(updateWedding, callback) {
        var cb = callback || angular.noop;

        return Wedding.save(updateWedding, function() {

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