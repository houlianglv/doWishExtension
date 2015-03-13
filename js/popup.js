"use strict";
var eBiz;
chrome.tabs.query({
	active: true,
	windowType: "normal",
	currentWindow: true
}, function(tabs) {
	if (tabs.length > 0) {
		var tab = tabs[0];
		console.log("get tab:" + tab.url);
	} else {
		return;
	}

	if (tab.url) {
		//match 
		eBiz = "TMall";
	}
	var port = chrome.tabs.connect(tab.id, {
		name: "doWish"
	});
	port.postMessage({
		name: "get" + eBiz + "Wish"
	});
	port.onMessage.addListener(function(result) {
		console.log(result);
		if (result) {
			var resObj = JSON.parse(result.wish);
			console.log(resObj);
		}
	});
});