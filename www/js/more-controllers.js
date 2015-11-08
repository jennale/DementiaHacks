angular.module('starter.more-controllers', [])

.controller('CareplanCatCtrl', function($scope, $http,$stateParams, AuthenticationService, $ionicPopup, $ionicLoading, $state, $ionicHistory) {
	$scope.category = $stateParams.category;
	$scope.subcategories = {};
	$http.get('data/careplans.json').success(function(data){
		$scope.subcategories = data[$scope.category];
		console.log(data);
	});
});
