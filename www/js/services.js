angular.module('starter.services', [])

.service('AuthenticationService', function($q,$http) {
	var self = this;
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
		window.localStorage.setItem(TOKEN_KEY, token);
		userToken = token;
	}

	function useCredentials(data) {
		user = data;
		window.localStorage['userInfo'] = JSON.stringify(data);
		window.localStorage.setItem('UserID', data.caregiver.id);
	    $http.defaults.headers.common['X-Auth-Token'] = getToken();
	}

	getCredentials = function() {
		return JSON.parse(window.localStorage['userInfo'] || false);
	};

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

					setupPusher();
				}
				else  {
					reject('Login Failed. Check yoself.');
				}
			 });
		});
	};

	var setupPusher = function() {
		if(self.pusher || !getToken())
			return;
		var pusher = new Pusher('328da61a3324c0e8578a', {
		  authEndpoint: POST_URL+'/notifications/pusher-auth',
		  auth: {
		    headers: {
		      'Authorization': "Bearer " + getToken()
		    }
		  }
		});

		self.pusher = pusher;
		self.channels = [];

		pusher.connection.bind('initialized', function() {
			console.log('initialized');
		});
		pusher.connection.bind('connecting', function() {
			console.log('connecting');
		});
		pusher.connection.bind('connected', function() {
			console.log('connected');
			self.channels['presence-connected'] = pusher.subscribe('presence-connected');
			self.channels['private-notifications'] = pusher.subscribe('private-notifications');

			self.channels['presence-connected'].bind('pusher:subscription_error', function(status) {
			  // status is http-status-code
			});
			self.channels['presence-connected'].bind('pusher:subscription_succeeded', function(members) {
			});
			self.channels['presence-connected'].bind('pusher:member_added', function(member) {
			});
			self.channels['presence-connected'].bind('pusher:member_removed', function(members) {
			});

			self.channels['private-notifications'].bind('pusher:subscription_error', function(status) {
			});
			self.channels['private-notifications'].bind('pusher:subscription_succeeded', function() {
			});
			self.channels['private-notifications'].bind('new:notification', function(data) {
				console.log('data received from server: ', data);
			});
		});
		pusher.connection.bind('unavailable', function() {
			console.log('unavailable');
		});
		pusher.connection.bind('failed', function() {
			console.log('failed');
		});
		pusher.connection.bind('disconnected', function() {
			console.log('disconnected');
		});
		pusher.connection.bind('connecting_in', function(delay) {
			console.log('connecting_in ' + delay + ' seconds');
		});
		pusher.connection.bind('state_change', function(states) {
		  // states = {previous: 'oldState', current: 'newState'}
		});
	}
	return {
		getUserInfo: getCredentials,
		getUser: function(){
			return user;
		},
		getUserID: function(){
			return window.localStorage.getItem("UserID");
		},
		getToken: getToken,
		setupPusher: setupPusher,
		login: login
	};
});