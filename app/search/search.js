'use strict';

angular.module('mySearchApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search/:user/:repoName', {
		templateUrl: 'search/viewOneRepository.html',
		controller: 'searchCtrl'
	}).when('/search/:user/:repoName/:number', {
		templateUrl: 'search/viewOneIssue.html',
		controller: 'searchCtrl'
	});
}])

.controller('searchCtrl', ['$scope', '$location', '$routeParams', 'searchRepo', function($scope, $location, $routeParams, searchRepo) {

	$scope.totalPages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33] //Since only the first 1000 records can be accessed

	$scope.initSearchPage = function(){

		$scope.itemsPerPage = 30

		var locationSearchObject = $location.search(),
			name = (locationSearchObject['name'] ? locationSearchObject['name'] : ''),
			page = (locationSearchObject['page'] ? locationSearchObject['page'] : 1),
			user = (locationSearchObject['user'] ? locationSearchObject['user'] : ''),
			sort = (locationSearchObject['sort'] ? locationSearchObject['sort'] : '')

		$scope.searchField = {
			name: name,
			page: page,
			user: user,
			sort: sort
		}

		if($scope.searchField.name != '') {
			$scope.hideSearchBox = true
			$scope.findRepository()
		}
		else
			$scope.hideSearchBox = false

	}

	$scope.findRepository = function() {

		if(!$scope.searchField.name || $scope.searchField.name == '') {
			alert('Please enter a name to search!')
			return
		}

		$location.search('name', $scope.searchField.name)
		$location.search('page', $scope.searchField.page)
		$location.search('user', $scope.searchField.user)
		$location.search('sort', $scope.searchField.sort)

		searchRepo.findRepo($scope.searchField).then(function(response) {

			$scope.result = response;
			$scope.hideSearchBox = true

		});
	}

	$scope.toggleSearchBox = function() {
		$scope.hideSearchBox = !$scope.hideSearchBox
	}

	$scope.getNextPage = function(page) {
		$scope.searchField['page'] = page

		$location.search('page', $scope.searchField.page)

		searchRepo.findRepo($scope.searchField).then(function(response) {

			$scope.result = response;

		});

	}

	$scope.findOneRepository = function() {

		$scope.searchField = { name: $routeParams.repoName, user: $routeParams.user }

		searchRepo.findRepo($scope.searchField).then(function(response) {

			$scope.repo = response.items[0];

		});

		searchRepo.getOpenIssues($scope.searchField).then(function(response) {

			$scope.openIssues = response.items;

		});

	}

	$scope.getOneIssue = function() {

		$scope.searchField = { name: $routeParams.repoName, user: $routeParams.user, number: $routeParams.number }

		searchRepo.getOneIssue($scope.searchField).then(function(response) {

			console.log(response)
			$scope.oneIssue = response;

		});

	}

}]).directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
});