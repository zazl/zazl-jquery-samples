/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
define(['jquery'], function($) {
	$(document).bind("mobileinit", function() {
	    $.mobile.linkBindingEnabled = false;
	    $.mobile.hashListeningEnabled = false;
	    $.mobile.pushStateEnabled = false;
	});
});