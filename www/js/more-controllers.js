angular.module('starter.more-controllers', [])

.controller('CareplanCatCtrl', function($scope, $http,$stateParams, AuthenticationService, $ionicModal, $ionicLoading, $state, $ionicHistory) {
	$scope.category = $stateParams.category;
	$scope.plans = {};
	$http.get('data/careplans.json').success(function(data){
		$scope.plans = data[$scope.category].plans;
		console.log($scope.plans);
	});
  $ionicModal.fromTemplateUrl('templates/tab-careplan-subcategory.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	$scope.openModal = function(index) {
		$scope.plan = $scope.plans[index];
	    $scope.modal.show();
	};
});


            // "title": "Go on daily walk",
            // "plan":"Go for 15 minute walk around neighborhood park",
            // "rating":"2",
            // "comments":""