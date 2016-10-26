'use strict';

//Global service for global variables
angular.module('mySearchApp').factory('Global', function() {
    var _this = this;

    _this.navOpen = false;

   	_this._data = {
       navOpen: _this.navOpen,
       setData: function(navOpen, authenticatedArg) {

           _this._data.navOpen = _this.navOpen = window.navOpen = navOpen;

    		},
    		getData: function() {
          return _this._data.navOpen
    		},
        removeData: function(){
          return _this._data.navOpen
        }
	};

	return _this._data;
});