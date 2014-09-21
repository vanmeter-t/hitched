'use strict';

angular.module('HitchedApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });