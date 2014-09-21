'use strict';

angular.module('HitchedApp')
  .factory('ContactUs', function ContactUs($location, $rootScope, $resource, Contact) {
    /**
     * Send contact email
     *
     * @param  {Object}   contact  - contact info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    return {
      sendEmail: function(contact, callback) {
        var cb = callback || angular.noop;

        return Contact.save(contact, function() {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },
    };
  })
  .factory('Contact', function($resource) {
    return $resource('/api/contact/', { //parameters default
      sendEmail: {
        method: 'PUT',
        params: {}
      }
    });
  });