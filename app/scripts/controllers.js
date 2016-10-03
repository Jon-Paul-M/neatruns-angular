'use strict';

angular.module('neatRunsApp')

.controller('HomeController', ['$scope', '$rootScope', 'AuthFactory', 'RunFactory', function ($scope, $rootScope, AuthFactory, RunFactory) {

    $scope.loggedIn = false;
    $scope.isAdmin = false;
    $scope.username = '';
    $scope.runRecord = {};
    
    $scope.checkAuth = function () {
        console.log("checkAuth");
        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
            if (AuthFactory.isAdmin()) {
                $scope.isAdmin = true;
            }
        };
    };
    $scope.checkAuth();
    
    $scope.submitRun = function () {
        console.log("submitRun");
        RunFactory.createRun($scope.runRecord);
        $scope.runRecord = {};
	alert('Sucess');
        //$scope.form.$setPristine();
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.isAdmin = AuthFactory.isAdmin();
        $scope.loggedIn = AuthFactory.isAuthenticated();
    });
    
    $rootScope.$on('logout:Successful', function () {
        $scope.isAdmin = AuthFactory.isAdmin();
        $scope.loggedIn = AuthFactory.isAuthenticated();
    });

}])



.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.isAdmin = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
        if (AuthFactory.isAdmin()) {
            $scope.isAdmin = true;
        }
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.isAdmin = false;
        $scope.loggedIn = false;
        $scope.username = '';
        $state.go('app', {});
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.isAdmin = AuthFactory.isAdmin();
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])

.controller('AdminController', ['$scope', function ($scope) {
    // TODO

}])

.controller('ProfileController', ['$scope', function ($scope) {
    // TODO

}])

.controller('LogsController', ['$scope', 'logsFactory','DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, logsFactory, DTOptionsBuilder, DTColumnDefBuilder) {

    $scope.runs = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(2)
        .withOption('order', [0, 'desc']);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1).notVisible(),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];
    
    $scope.runs = logsFactory.query();
    //console.log($scope.runs);

}])

.controller('ChartsController', ['$scope', function ($scope) {
    // TODO
    
}])

;
