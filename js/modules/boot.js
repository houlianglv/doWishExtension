requirejs.config(requirejsConfig);

require(['jquery', 'doWish'], function($, doWish) {
	var $container = $('.app-container');
	doWish.init($container);
});