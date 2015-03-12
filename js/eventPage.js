// chrome.browserAction.onClicked.addListener(function(tab) {
// 	chrome.tabs.executeScript(tab.id, {
// 		"file": "js/lib/jquery.js"
// 	}, function() { // Execute your code
// 		console.log("Script jquery Executed .. "); // Notification on Completion
// 		chrome.tabs.executeScript(tab.id, {
// 			"file": "js/content.js"
// 		});
// 	});
// });
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	console.log(sender.tab ?
// 		"from a content script:" + sender.tab.url :
// 		"from the extension");
// 	if (request.greeting == "hello") {
		// chrome.tabs.query({
		// 	active: true,
		// 	windowType: "normal",
		// 	currentWindow: true
		// }, function(d) {
		// 	var res;
		// 	if (d.length > 0) {
		// 		res = "get " + d.length + " tabs!";
		// 	} else {
		// 		res = "no tab found!"
		// 	}
		// 	sendResponse({
		// 		farewell: "goodbye",
		// 		res: res
		// 	});
		// });
// 	}
// });