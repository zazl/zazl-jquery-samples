/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
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
