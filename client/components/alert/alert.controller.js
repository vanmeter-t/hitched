'use strict';

angular.module('HitchedApp').controller('AlertCtrl', function($scope, $modalInstance, alertTitle, alertBody, alertClass) {

	$scope.alertTitle = alertTitle;
	$scope.alertBody = alertBody;
	$scope.alertClass = alertClass;

    $scope.close = function() {
        $modalInstance.close();
    };
});