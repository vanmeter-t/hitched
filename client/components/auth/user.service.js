'use strict';

angular.module('HitchedApp')
  .factory('User', function($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      changeEmail: {
        method: 'PUT',
        params: {
          id: 'email'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  });