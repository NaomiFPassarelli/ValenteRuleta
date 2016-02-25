// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ValenteRuleta', ['ionic', 'ngStorage', 'ngCordova', 'ValenteRuleta.controllers'])

.run(function ($ionicPlatform, $rootScope, $location, $state, Store) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        /////// Debugging constants
        $rootScope.isDebug = false; // IMPORTANT! On deploy, set to false.
        $rootScope.recognizeImg = true;
    });

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        // redirect to login page if not logged in
        var auth = Store.get('_authentication');
        var loggedIn = auth !== [] && auth.isAuth === true;


        if ($location.path().indexOf('/details') === -1 && $location.path().indexOf('/map') === -1) {
            $rootScope.visibleDetailsTab = false;
        }

        if ($location.path().indexOf('/history') === -1) {
            $rootScope.visibleHistoryTab = false;
        }

        if ($location.path().indexOf('/nonEstructureProduct') === -1) {
            $rootScope.visibleProductTab = false;
        }

        if ($location.path().indexOf('/ranking') === -1) {
            $rootScope.visibleRankingTab = false;
        }

        if ($location.path().indexOf('/profile') === -1) {
            $rootScope.visibleProfileTab = false;
        }

        if ($location.path().indexOf('/config') === -1) {
            $rootScope.visibleConfigTab = false;
        }

        if ($location.path() !== '/login' && !loggedIn) {
            $state.go('login');

        }
        else if ($location.path() === '/login' && loggedIn) {
            $state.go('tab.home');
        }

    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $ionicConfigProvider.navBar.alignTitle("center");
    $ionicConfigProvider.tabs.position("bottom");

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('index', {
          url: '/index',
          templateUrl: 'views/index.html',
          controller: 'HomeCtrl'
      })


    // setup an abstract state for the tabs directive
      .state('spin', {
          url: "/spin",
          cache: false,
          templateUrl: "/views/spin.html",
          controller: "HomeCtrl"
      })

    // Each tab has its own nav history stack:

    .state('tab.home', {
        url: '/home',
        cache: false,
        views: {
            'tab-home': {
                templateUrl: 'views/homeView.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('tab.details', {
        cache: false,
        url: '/details?id',
        views: {
            'tab-details': {
                templateUrl: 'views/detailsView.html',
                controller: 'DetailsCtrl'
            }
        }
    })

    .state('tab.map', {
        url: '/map',
        cache: false,
        views: {
            'tab-map': {
                templateUrl: 'views/mapView.html',
                controller: 'MapCtrl',
            }
        }
    })

    .state('tab.profile', {
        url: '/profile',
        cache: false,
        views: {
            'tab-profile': {
                templateUrl: 'views/profileView.html',
                controller: 'ProfileCtrl',
            }
        }
    })

    .state('tab.config', {
        url: '/config',
        cache: false,
        views: {
            'tab-config': {
                templateUrl: 'views/configView.html',
                controller: 'ConfigCtrl',
            }
        }
    })

    .state('tab.ranking', {
        url: '/ranking',
        cache: false,
        views: {
            'tab-ranking': {
                templateUrl: 'views/rankingView.html',
                controller: 'RankingCtrl',
            }
        }
    })

    .state('tab.history', {
        url: '/history',
        cache: false,
        views: {
            'tab-history': {
                templateUrl: 'views/historyView.html',
                controller: 'HistoryCtrl'
            }
        }
    })

    .state('tab.nonEstructureProduct', {
        url: '/nonEstructureProduct',
        cache: false,
        views: {
            'tab-nonEstructureProduct': {
                templateUrl: 'views/nonEstructureProductView.html',
                controller: 'NonStructureProductCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});

