angular.module('starter.more-controllers', [])

.controller('CareplanCatCtrl', function($scope, $http, $stateParams, AuthenticationService, $ionicModal, $ionicLoading, $state, $ionicHistory) {
	$scope.category = $stateParams.category;
	$scope.plans = {};
	$http.get('data/careplans.json').success(function(data) {
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
})

.controller('MedicationsCtrl', function($scope, $http, $stateParams, AuthenticationService, $ionicPopup, $ionicLoading, $state, $ionicHistory) {
	$scope.remind = function(medName) {
		$ionicPopup.confirm({
			title: 'Add a reminder about this medication today?',
			text: medName
		}).then(function(res) {
			if (res) {
				//TODO: Actually create a reminder from this page instead of redirecting
				$state.go('tab.reminders'); 
			}
		});
	};

});




// $ionicPopup.show({
// 	template: '<input type="password" ng-model="data.wifi">',
// 	title: 'Enter Wi-Fi Password',
// 	subTitle: 'Please use normal things',
// 	scope: $scope,
// 	buttons: [{
// 		text: 'Cancel'
// 	}, {
// 		text: '<b>Save</b>',
// 		type: 'button-positive',
// 		onTap: function(e) {
// 			if (!$scope.data.wifi) {
// 				//don't allow the user to close unless he enters wifi password
// 				e.preventDefault();
// 			} else {
// 				return $scope.data.wifi;
// 			}
// 		}
// 	}]
// });
