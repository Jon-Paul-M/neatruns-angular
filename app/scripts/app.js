'use strict';

angular.module('neatRunsApp', ['ui.router','datatables', 'ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the admin page
            .state('app.admin', {
                url:'admin',
                views: {
                    'content@': {
                        templateUrl : 'views/admin.html',
                        controller  : 'AdminController'                  
                    }
                }
            })
        
            // route for the profile page
            .state('app.profile', {
                url:'profile',
                views: {
                    'content@': {
                        templateUrl : 'views/profile.html',
                        controller  : 'ProfileController'                  
                    }
                }
            })

            // route for the logs page
            .state('app.logs', {
                url: 'logs',
                views: {
                    'content@': {
                        templateUrl : 'views/logs.html',
                        controller  : 'LogsController'
                    }
                }
            })

            // route for the charts page
            .state('app.charts', {
                url: 'charts',
                views: {
                    'content@': {
                        templateUrl : 'views/charts.html',
                        controller  : 'ChartsController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
.filter('secondsToTime', [function() {
    console.log("in secondsToTime")
        return function(seconds) {
            if(isNaN(seconds)) {
                return "";
            } else {
                return new Date(1970, 0, 1).setSeconds(seconds);
            }
        }
}])
;
