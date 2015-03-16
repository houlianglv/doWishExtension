requirejs.config(requirejsConfig);

require(['jquery'], function($) {
	"use strict";

	var container = undefined,
		_start_get_wish, _get_current_tab, _match_url, _get_Wish, _connect_tab, eBizMap = {
			TMall: 'TMall',
			Taobao: 'Taobao',
			Amazon: 'Amazon'
		},
		eBiz,
		port, init;

	_get_current_tab = function() {
		var dtd = $.Deferred();
		chrome.tabs.query({
			active: true,
			windowType: "normal",
			currentWindow: true
		}, function(tabs) {
			if (tabs.length > 0) {
				dtd.resolve(tabs[0]);
			} else {
				dtd.reject();
			}
		});
		return dtd.promise();
	};

	_match_url = function(url) {
		var re = /^http:\/\/detail.tmall.com\//i;
		var found = url.match(re);
		if (found.length > 0) {
			eBiz = eBizMap["TMall"];
			return true;
		} else {
			return false;
		}
		return found.length > 0;
	};

	_connect_tab = function(eBiz) {
		// var dtd = $.Deferred();

		// port.postMessage({
		// 	name: "get" + eBiz + "Wish"
		// });
		// port.onMessage.addListener(function(result) {
		// 	dtd.resolve(result);
		// 	// console.log(result);
		// 	// if (result) {
		// 	// 	var resObj = JSON.parse(result.wish);
		// 	// 	console.log(resObj);
		// 	// }
		// });
		// return dtd.promise();
	};

	_get_Wish = function(eBiz) {
		port = chrome.tabs.connect(tab.id, {
			name: "doWish"
		});;

	};

	_start_get_wish = function() {
		_get_current_tab().done(function(tab) {
			//match tab.url
			var isMatch = _match_url(tab.url);
			//establish a port
			if (isMatch) {
				_get_Wish(eBiz);
			} else {
				return;
			}
		});
	};

	init = function($container) {
		container = $container;
		_start_get_wish();
	};

	return {
		init: init
	}
});