var zazlConfig = {
	baseUrl: 'js/',
	directInject: true,
	paths: {
		jquery: '../lib/jquery/jquery-2.0.2',
		jquerymobile: '../lib/mobile/jquery.mobile-1.3.1',
		underscore: '../lib/underscore/underscore-1.4.4',
		backbone: '../lib/backbone/backbone-1.0.0',
		socketio: '../lib/socketio/socket.io',
		text: '../lib/requirejs/text',
		templates: '../templates'
	},
	shim: {
		'backbone' : {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore' : {
			exports: '_'
		}
	}
};

require(['app']);
