requirejs.config(requirejsConfig);

define('wishRender', ['jquery'], function() {
	var render, _wish, _eBiz, _$container, _renderMap, _TMall_render, _default_render;

	_renderMap = {
		TMall: _TMall_render
	};

	_TMall_render = function($container) {
		$('<div>' + _wish + '</div>').appendTo(_$container);
	};

	_default_render = function() {};

	render = function(wish, $container) {
		_wish = wish;
		_eBiz = _wish.eBiz;
		_$container = $container;
		if (eBiz !== undefined || eBiz !== null) {
			_renderMap[eBiz]($container);
		} else {
			_default_render();
		}
	};

	return {
		render: render
	};
});