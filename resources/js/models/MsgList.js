/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
define(['backbone', './Msg'], function(Backbone, Msg){
	var MsgList = Backbone.Collection.extend({
		model: Msg,
		url: "./msg"
	});
	return MsgList;
});
