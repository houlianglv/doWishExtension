requirejs.config(requirejsConfig);

define('doWish', ['jquery', 'wishRender'], function($, wishRender) {
	"use strict";

	var $appContainer = undefined,
		_start_get_wish, _get_current_tab, _match_url, _get_Wish, _connect_tab, _process_wish,
		eBizMap = {
			TMall: 'TMall',
			Taobao: 'Taobao',
			Amazon: 'Amazon'
		},
		eBiz, currentTab,
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
		if (found !== null && found.length > 0) {
			eBiz = eBizMap["TMall"];
			return true;
		} else {
			return false;
		}
	};

	_connect_tab = function() {
		return chrome.tabs.connect(currentTab.id, {
			name: "doWish"
		});
	};

	_get_Wish = function(eBiz) {
		var dtd = $.Deferred();
		port = _connect_tab();
		port.onMessage.addListener(function(result) {
			dtd.resolve(result);
		});
		port.postMessage({
			name: "get" + eBiz + "Wish"
		}); //maybe should be called before onMessage?
		return dtd.promise();
	};

	_process_wish = function(result) {
		wishRender.render(result.wish, $appContainer);
		// $('<div>'+result.wish+'</div>').appendTo($appContainer);
		// //console.log(result);
	};
	_start_get_wish = function() {
		_get_current_tab().done(function(tab) {
			currentTab = tab;
			var isMatch = _match_url(currentTab.url);
			if (isMatch) {
				_get_Wish(eBiz).done(_process_wish);
			} else {
				return;
			}
		});
	};

	init = function($container) {
		$appContainer = $container;
		_start_get_wish();
	};

	return {
		init: init
	}
});