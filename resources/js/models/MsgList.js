define(['backbone', './Msg'], function(Backbone, Msg){
	var MsgList = Backbone.Collection.extend({
		model: Msg,
		url: "./msg"
	});
	return MsgList;
});
