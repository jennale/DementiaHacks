// Ionic Starter App
var POST_URL = "http://dementiahacks:8888";
POST_URL = "http://dementiahack-api.mex";
POST_URL = "http://hbling-api.prosamsonline.com";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.more-controllers','starter.services', 'ui.calendar'])

.run(function($ionicPlatform, AuthenticationService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    AuthenticationService.setupPusher();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

   .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })
 .state('home',{
    url:'/home',
    templateUrl: 'templates/home.html'
  })
  .state('login',{
    url:'/login',
    templateUrl: 'templates/login.html',
    controller:'LoginCtrl'
  })
  .state('create',{
    url:'/create',
    templateUrl: 'templates/create.html',
    controller:"SignUpCtrl"
  })
  .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'NotificationsCtrl',
          resolve: {
              notificationsResp: function($http, AuthenticationService) {
                return $http({
                  method  : 'GET',
                  url     : POST_URL+'/notifications'+'?sort=-created_at&access_token='+ AuthenticationService.getToken(),
                  data    : $.param({}),  // pass in data as strings
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                 });
              }
          },
        }
      }
    })

  .state('tab.plan', {
      url: '/plan',
      views: {
        'tab-careplan': {
          templateUrl: 'templates/tab-careplan.html',
        }
      }
    })
  .state('tab.plan-category', {
      url: '/plan/:category/',
      views: {
        'tab-careplan': {
          templateUrl: 'templates/tab-careplan-category.html',
          controller: 'CareplanCatCtrl'
        }
      }
    })
  .state('tab.reminders', {
      url: '/reminders',
      views: {
        'tab-reminders': {
          templateUrl: 'templates/tab-reminders.html',
          controller: 'TaskCtrl',
          resolve: {
              tasksResp: function($http, AuthenticationService) {
                return $http({
                  method  : 'GET',
                  url     : POST_URL+'/tasks'+'?sort=-created_at&access_token='+ AuthenticationService.getToken(),
                  data    : $.param({}),  // pass in data as strings
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                 });
              }
          },
        }
      }
    })
  .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-calendar': {
          templateUrl: 'templates/tab-calendar.html',
          controller: 'CalendarController'
        }
      }
    })
  .state('tab.other', {
      url: '/other',
      views: {
        'tab-other': {
          templateUrl: 'templates/tab-other.html',
        }
      }
    })
  .state('tab.other-med', {
      url: '/other/meds',
      views: {
        'tab-other': {
          templateUrl: 'templates/tab-other-med.html',
          controller: 'MedicationsCtrl'
        }
      }
    })


  // .state('app.login', {
  //     url: '/login',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/login.html',
		//     controller: 'LoginCtrl'
  //       }
  //     }
  //  })

  // .state('app.create', {
  //     url: '/create',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/create.html',
		//     controller: 'SignUpCtrl'
  //       }
  //     }
  //  })

  .state('app.patients', {
      url: '/patients',
      views: {
        'menuContent': {
          templateUrl: 'templates/patients.html',
          controller: 'SelectionsController'
        }
      }
    })
  .state('app.patients-create', {
    url: '/patients/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/createPatient.html',
        controller: 'PatientCreationController'
      }
    }
  })
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
