angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('LoginCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicLoading, $timeout, AuthenticationService) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	// $ionicModal.fromTemplateUrl('templates/login.html', {
	// 	scope: $scope
	// }).then(function(modal) {
	// 	$scope.modal = modal;
	// });

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		$ionicLoading.show({
     		template: 'Loading...'
    	});
		AuthenticationService.login($scope.loginData).then(function(result){
			$rootScope.user = AuthenticationService.getUserID();
			$ionicLoading.hide();
			$state.go('app.patients', {}, {reload: true, notify:true});
		}, function(err) {
			$ionicLoading.hide();
			var errorPop = $ionicPopup.alert({
				title: 'Login Failed.'
			});
		});
	};
})

.controller('SignUpCtrl', function($scope, $http, AuthenticationService, $ionicPopup, $ionicLoading, $state, $ionicHistory) {
	// Form data for the login modal
	$scope.createData = {};
	$scope.errors = '';
	$scope.success = '';

	$scope.create = function() {
		$http({
		  method  : 'POST',
		  url     : 'POST_URL/caregivers',
		  data    : $.param($scope.createData),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 })
		.success(function(data) {
		 if (data.status==='success') {
			$ionicPopup.alert({
				title: data.message,
				template: "Login with your new credentials!"
			}).then(function(){
					$ionicHistory.goBack();
				});
		 } else {
		 	$scope.errors = data.errors;
			$ionicPopup.alert({
				title: data.message
			});
		 }
		});
	};
})

.controller('SelectionsController', function($scope, $stateParams, $rootScope, $http, $ionicModal, $timeout,AuthenticationService) {
	var user = $rootScope.user;
	$http.get(POST_URL+'/caregivers/'+ AuthenticationService.getUserID() +'?access_token='+ AuthenticationService.getToken()).success(function(data){
		console.log(data.patients);
	});
})

.controller('PatientCreationController', function($scope,$ionicPopup, $stateParams, $rootScope, $http, $ionicModal, $timeout,AuthenticationService) {
	var user = $rootScope.user;
	// $http.get(POST_URL+'/patients/'+ AuthenticationService.getUserID() +'?access_token='+ AuthenticationService.getToken()).success(function(data){
	// 	console.log(data.patients);
	// });
	// Form data for the login modal
	$scope.createData = {};
	$scope.errors = '';
	$scope.success = '';

	$scope.create = function() {
		$http({
		  method  : 'POST',
		  url     : POST_URL+'/patients'+'?access_token='+ AuthenticationService.getToken(),
		  data    : $.param($scope.createData),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 })
		.success(function(data) {
			console.log(data);
		 if (data.status==='success') {
			$ionicPopup.alert({
				title: data.message,
				template: "Profile has successfully been created!"
			}).then(function(){
					$ionicHistory.goBack();
				});
		 } else {
		 	$scope.errors = data.errors;
			$ionicPopup.alert({
				title: data.message
			});
		 }
		});
	};
})

.controller('CalendarController', function($scope, $stateParams, $rootScope, $timeout, AuthenticationService) {
	var user = $rootScope.user;
	// $http.get(POST_URL+'/patients/'+ AuthenticationService.getUserID() +'?access_token='+ AuthenticationService.getToken()).success(function(data){
	// 	console.log(data.patients);
	// });
	// Form data for the login modal
	$scope.createData = {};
	$scope.errors = '';
	$scope.success = '';

	$scope.eventSources = [
		{
		    events: [
		        {
		            title: 'Event1',
		            start: '2015-11-07'
		        },
		        {
		            title: 'Event2',
		            start: '2015-11-07'
		        }
		        // etc...
		    ],
		    color: 'yellow',   // an option!
		    textColor: 'black' // an option!
		},
		{
		    events: [
		        {
		            title: 'Event1',
		            start: '2015-11-07'
		        },
		        {
		            title: 'Event2',
		            start: '2015-11-07'
		        }
		        // etc...
		    ],
		    color: 'blue',   // an option!
		    textColor: 'black' // an option!
		}
	];
    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

});


