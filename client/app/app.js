'use strict';

angular.module('HitchedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        // Main page (this will load individual partials for each section)
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/dashboard', {
        // If authenticated, send to the User Dashboard 
        templateUrl: 'app/member/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if (response.status === 401) {
        $location.path('/');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
})

.directive('focus', function($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focus, function(value) {
        if (value) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
})

.directive('affix', function() {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      $element.affix({
        offset: {
          top: -$('#nav').height()
        }
      });
    }
  };
})

.controller('DatepickerCtrl', function($scope) {
  $scope.toggleMin = function() {
    $scope.minDate = ($scope.minDate) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yyyy'",
    'starting-day': 1
  };
})

.run(function($rootScope, $location, Auth) {
  // Redirect to index if route requires auth and you're not logged in
  $rootScope.$on('$routeChangeStart', function(event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        $location.path('/');
      }
    });
  });
});