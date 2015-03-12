var tab = chrome.tabs.getCurrent(),
	eBizWishMap = {
		TMall: function() {},
		Taobao: function() {},
		Amazon: function() {}
	},
	getEBizWish;

if (tab.url) {
	//if url match some pattern
	getEBizWish = eBizWishMap["TMall"];
}

var doWish = (function() {

	return {
		getWish: getEBizWish
	};
})();

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "doWish");
	port.onMessage.addListener(function(command) {
		if (command.name) {
			var wish = doWish[command.name]();
			var wishJSON = JSON.stringify(wish); //circular structure cannot be convert!
			console.log(wishJSON);
			port.postMessage({
				wish: wishJSON
			});
		}
		console.log(command);
	});
});