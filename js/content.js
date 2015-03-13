var doWish = (function() {
	var getTMallWish, getAmazonWish, getTaobaoWish;
	getTMallWish = function() {
		var jqueryMap = {
			$price: $('.tm-price'),
			$title: $('.tb-detail-hd'),
			$img: $('.tb-thumb')
		};
		console.log(jqueryMap);
		return {};
	};
	getAmazonWish = function() {

	};
	getTaobaoWish = function() {

	};
	return {
		getTMallWish: getTMallWish,
		getAmazonWish: getAmazonWish,
		getTaobaoWish: getTaobaoWish
	};
})();

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "doWish");
	port.onMessage.addListener(function(command) {
		if (command.name) {
			var wish = doWish[command.name]();
			wish = {
				name: "basketball",
				price: "149",
				currency: "rmb",
				url: "detail.tmall.com/123144523"
			};
			var wishJSON = JSON.stringify(wish); //circular structure cannot be convert!
			console.log(wishJSON);
			port.postMessage({
				wish: wishJSON
			});
		}
		console.log(command);
	});
});