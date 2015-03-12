var doWish = (function() {
	var getWish, jqueryMap = {};

	getWish = function() {
		jqueryMap.$body = $('body');
		var $price = jqueryMap.$body.find('.tm-price');
		return $price;
	};

	return {
		getWish: getWish
	};
})();

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "knockknock");
	port.onMessage.addListener(function(command) {
		if (command.name) {
			var $price = doWish[command.name]();
			var data = JSON.stringify($price); //circular structure cannot be convert!
			console.log(data);
			port.postMessage({
				$price: data
			});
		}
		// if (msg.joke == "Knock knock") {
		// 	port.postMessage({
		// 		question: "Who's there?"
		// 	});
		// } else if (msg.answer == "Madame") {
		// 	port.postMessage({
		// 		question: "Madame who?"
		// 	});
		// } else if (msg.answer == "Madame... Bovary") {
		// 	port.postMessage({
		// 		question: "I don't get it."
		// 	});
		// }
		console.log(command);
	});
});