'use strict';

// Declare app level module which depends on views, and components
angular.module('mySearchApp', [
	'ngRoute',
	'mySearchApp.header',
	'mySearchApp.search',
	'ngSanitize'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

	$locationProvider.hashPrefix('!');

}])
.run(['$rootScope', 'Global', function($rootScope, Global) {

    // Close the sidebar if opened
    $rootScope.$on('$routeChangeStart', function (event, next, prev) {
		Global.navOpen = false
    })

}])