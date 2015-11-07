angular.module('starter.services', [])

.service('AuthenticationService', function($q,$http) {
	var TOKEN_KEY = 'authToken';
	var TOKEN, username, role, authToken  = '';
	var authStatus = false;
	var user = {};
	var userToken;

	var getToken = function getToken() {
		var token = window.localStorage.getItem(TOKEN_KEY);
		return token;
	};

	function setToken(token) {
		console.log("token:"+token);
		window.localStorage.setItem(TOKEN_KEY, token);
		userToken = token;
	}

	function useCredentials(data) {
		user = data;
		window.localStorage.setItem('UserID', data.caregiver.id);
	    $http.defaults.headers.common['X-Auth-Token'] = getToken();
	}

	function destroyCredentials() {
		user.token = undefined;
		user = undefined;
	}

	var login = function(loginData){
		//REQUEST WILL GO HERE
		var request = false;
		return $q( function(resolve, reject) {
			$http({
			  method  : 'POST',
			  url     : POST_URL+'/caregivers/basic-login',
			  data    : $.param(loginData),  // pass in data as strings
			  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
			 }).success(function(data){
				console.log(data);
				if (data.status === 'success') {
					resolve('Successfully logged in.');
					useCredentials(data.data);
					setToken(data.data.token.jwt);
				}
				else  {
					reject('Login Failed. Check yoself.');
				}
			 });
		});
	};
	return {
		getUser: function(){
			return user;
		},
		getUserID: function(){
			return window.localStorage.getItem("UserID");
		},
		getToken: getToken,
		login: login
	};
});