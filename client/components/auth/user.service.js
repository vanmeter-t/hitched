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
          controller: 'email'
        }
      },
      linkGames:{
        method: 'PUT',
        params: {
          controller: 'linkGames'
        }
      },
      removeGame:{
        method: 'PUT',
        params: {
          controller: 'removeGame'
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