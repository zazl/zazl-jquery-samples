/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
define(['jquery', 'mobileconfig', 'routers/router'], function($, mobileconfig, router) {
    $(document).ready(function() {
		console.log("ready");
	    this.router = new router();
	});
	
	return {};
});
