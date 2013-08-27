/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
define(['backbone'], function(Backbone) {
	var Msg = Backbone.Model.extend({
		defaults: {
			msg: null
		}
	});
	
	return Msg;
});