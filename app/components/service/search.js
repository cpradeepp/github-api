'use strict';

angular.module('mySearchApp').factory('searchRepo', function($http) {
	var searchRepo = {
		findRepo: function(searchObject) {

			var query = ''

			if(searchObject.user && searchObject.user != '')
				query = 'https://api.github.com/search/repositories?q=repo:' + searchObject.user + '/' + searchObject.name
			else
				query = 'https://api.github.com/search/repositories?q=' + searchObject.name

			if(searchObject.page && searchObject.page != '')
				query = query + '&page=' + searchObject.page

			if(searchObject.sort && searchObject.sort != '')
				query = query + '&sort=' + searchObject.sort

			var http = $http.get(query).then(
			function (response) {
				//return the response if the request is success
				return response.data;
			},
			function(response){
				// Error handler for the request
				return response
			});

			return http;
		},
		getOpenIssues: function(searchObject) {

			var query = 'https://api.github.com/search/issues?q=repo:'+ searchObject.user + '/' + searchObject.name + '&is=issue&is=open'

			var http = $http.get(query).then(
			function (response) {
				//return the response if the request is success
				return response.data;
			},
			function(response){
				// Error handler for the request
				return response
			});

			return http

		},
		getOneIssue: function(searchObject){

			var query = 'https://api.github.com/repos/' + searchObject.user + '/' + searchObject.name + '/issues/' + searchObject.number
			
			var http = $http.get(query).then(
			function (response) {
				//return the response if the request is success
				return response.data;
			},
			function(response){
				// Error handler for the request
				return response
			});

			return http

		}
	}

	return searchRepo;
});

// angular.module('mySearchApp').factory('searchRepo', ['$http', function($http) {

// 	var _this = this;

// 	_this._data = {
// 	    findRepo: function(repoName) {
	        
// 	        return $http({method: 'GET', url: 'https://api.github.com/search/repositories?q=' + repoName})

// 	    }
// 	}

// 	return _this._data;

// }])