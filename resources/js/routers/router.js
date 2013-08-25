define([
	'jquery', 
	'backbone', 
	'underscore',
	'jquerymobile',
	'models/MsgList',
	'views/MsgListView'
	], 
function($, Backbone, _, mobile, MsgList, MsgListView){
	var Router = Backbone.Router.extend({
		initialize: function() {
			$('.back').on('click', function(event) {
	            window.history.back();
	            return false;
	        });
	        this.on("route:msglist", function() {
				var msglist = new MsgList();
				msglist.fetch({
					success: function(collection, response, options) {
						this.changePage(new MsgListView({msgs: collection}));
					}.bind(this),
					error: function(collection, xhr, options) {
						console.log("failed!!!");
					}
				});
	        	
			});
			Backbone.history.start();
		},
	    changePage:function (page) {
	        $(page.el).attr('data-role', 'page');
	        page.render();
	        $('body').append($(page.el));
	        mobile.changePage($(page.el), {changeHash:false, reverse: false});
	    },
		routes: {
			'': 'msglist'
		}
	});
	
	return Router;
});
