'use strict';

angular.module('mySearchApp.header', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search', {
		templateUrl: 'search/search.html',
		controller: 'searchCtrl',
		reloadOnSearch: false
	}).when('/about', {
		templateUrl: 'search/search.html',
		controller: 'searchCtrl'
	}).when('/contact', {
		templateUrl: 'search/search.html',
		controller: 'searchCtrl'
	}).otherwise({ redirectTo: '/search' });
}])

.controller('headerCtrl', ['$scope', '$rootScope', 'Global', function($scope, $rootScope, Global) {

	// controller function goes here

	$scope.global = Global

	$scope.toggleNav = function() {

		$scope.global.navOpen = !$scope.global.navOpen

	}

	$scope.checkIfMenuIsOpen = function() {
		if($scope.global.navOpen)
			return true
		else 
			return false
	}

}]).directive('navbar', function() {
	return  {
		restrict: 'E',
		templateUrl: 'header/header.html'
	};
});