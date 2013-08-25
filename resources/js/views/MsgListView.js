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
					contentTypeString: "application/x-www-form-urlencoded; charset=utf-8",
					data: {msg: msg},
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
		    	$("#msgList").append('<li>'+msg.content+'</li>');	
		    	$("#msgList").listview('refresh');
		  	});			
		},
	});
	
	return View;
});
