/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
define([
		'jquery', 
		'backbone',
		'underscore',
		'socketio',
		'text!templates/MsgList.html'], 
function($, Backbone, _, io, template){
	var View = Backbone.View.extend({
		events: {
			"click #send" : function() {
				this.sendMsg();
			}
		},
		initialize: function(options) {
			this.template = _.template( template, { msgs: options.msgs.toJSON() } );
			this._openWebSocket();
		},
		render: function(){
			$(this.el).html( this.template );
		},
		sendMsg: function() {
			var msg = $("#msgtextarea").val();
			if (msg && msg !== "") {
				$.ajax({
					url: "./msg",
					type: "POST",
					headers: { "cache-control": "no-cache" },
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					data: JSON.stringify({msg: msg}),
					success: function(data, textStatus, jqXHR) {
						console.log("msg sent");
					}.bind(this),
					error: function(jqXHR, textStatus, errorThrown) {
						console.log("send MSG error: "+textStatus);
					}
				});
			}
		},
		_openWebSocket: function() {
			io.transports = ['xhr-polling'];
			var socket = io.connect('http://'+window.location.host);
			socket.on('msg', function (msg) {
		    	$("#msgList").append('<li>'+msg.msg+'</li>');	
		    	$("#msgList").listview('refresh');
		  	});			
		},
	});
	
	return View;
});
