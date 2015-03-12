chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {
		"file": "js/lib/jquery.js"
	}, function() { // Execute your code
		console.log("Script jquery Executed .. "); // Notification on Completion
		chrome.tabs.executeScript(tab.id, {
			"file": "js/content.js"
		});
	});
});