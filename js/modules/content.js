requirejs.config(requirejsConfig);

require(
	['jquery'],
	function($) {
		var doWish = (function() {
			var getTMallWish, getAmazonWish, getTaobaoWish;
			getTMallWish = function() {
				var jqueryMap = {
					$price: $('.tm-price'),
					$title: $('title'),
					$img: $('.tb-thumb img')
				};
				if (jqueryMap.$price.size() > 0) {
					var prices = [];
					jqueryMap.$price.each(function(i) {
						prices[i] = $(this).html();
					});
				}
				var title = ""
				jqueryMap.$title.size() > 0 ? title = jqueryMap.$title.text() : title;
				if (jqueryMap.$img.size() > 0) {
					var imgUrls = [];
					jqueryMap.$img.each(function(i) {
						imgUrls[i] = $(this).attr('src');
					});
				}
				console.log(jqueryMap);
				return {
					prices: prices,
					title: title,
					imgUrls: imgUrls
				};
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
					var wishJSON = JSON.stringify(wish); //circular structure cannot be convert!
					console.log(wishJSON);
					port.postMessage({
						wish: wishJSON
					});
				}
				console.log(command);
			});
		});
	});