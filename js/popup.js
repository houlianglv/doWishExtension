"use strict";
console.log("icon clicked!");
chrome.tabs.query({
	active: true,
	windowType: "normal",
	currentWindow: true
}, function(d) {
	var res;
	if (d.length > 0) {
		res = "get " + d.length + " tabs!";
		var tab = d[0];
	} else {
		res = "no tab found!"
	}
	console.log(res);
	var port = chrome.tabs.connect(tab.id, {
		name: "doWish"
	});
	port.postMessage({
		name: "getWish"
	});
	port.onMessage.addListener(function(result) {
		console.log(result);
		if (result.price) {
			var price = JSON.parse(result.price);
			console.log(price);
		}
	});
});