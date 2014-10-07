'use strict';
console.log('NavbarCtrl');

angular.module('HitchedApp')
  .controller('NavbarCtrl', function($scope, $location, $modal, $log, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    // The additional guest menu items
    $scope.guest = [{
      'title': 'About',
      'section': 'aboutSection'
    }, {
      'title': 'Contact Us',
      'section': 'contactSection'
    }];

    // The additional member menu items
    $scope.member = [{
      'title': 'Home',
      'link': '/dashboard',
      'glyphicon': 'glyphicon-home'
    }];

    // Logout current user
    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    // Scroll to section (for main page only)
    $scope.scrollTo = function(section) {
      if ($('#' + section).length === 0) {
        $location.path('/');
      } else {
        $location.hash(section);
        $('body').animate({
          scrollTop: $('#' + section).offset().top
        }, 'slow');
      }
    };

    // Open a modal template
    $scope.open = function(template, ctrl) {
      var modalInstance = $modal.open({
        templateUrl: 'app/account/' + template + '/' + template + '.html',
        controller: ctrl
      });

      modalInstance.result.then(function(result) {
        if (result && result.template) {
          $scope.open(result.template, result.ctrl);
        }
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });