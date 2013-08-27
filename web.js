/*
    Copyright (c) 2004-2013, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/

var http = require('http');
var fs = require('fs');
var connect = require('connect');
var io = require('socket.io');
var zazloptimizer = require('zazloptimizer');

var resourcecdir = fs.realpathSync(__dirname+"/resources");
var port = process.env.PORT || 5000;

var wslist = [];
var messages = [];

var optimizer = zazloptimizer.createConnectOptimizer(resourcecdir, true);
var app = connect()
	.use("/_javascript", optimizer)
	.use("/msg", function(request, response) {
		if (request.method === "GET") {
			response.write(JSON.stringify(messages));
		} else if (request.method === "POST") {
			var postdata = '';
			request.on('data', function(data) { postdata += data; });
			request.on('end', function() {
				var msg = JSON.parse(postdata);
				messages.push(msg);
				if (messages.length > 10) {
					messages.shift();
				}			
				wslist.forEach(function(ws) {
					ws.emit('msg', msg);
				});
			});
		}
		response.end();
	})
	.use(connect.static(resourcecdir))
	.use(connect.static(zazloptimizer.getLoaderDir()));

var server = http.createServer(app).listen(port);

var iosvr = io.listen(server);
iosvr.set("transports", ["xhr-polling"]);
iosvr.set('log level', 1); 
console.log("socket.io transports set to : "+iosvr.get("transports"));

iosvr.sockets.on('connection', function (ws) {
	wslist.push(ws);
});

console.log("Zazl Demonstration Samples for JQuery running on port ["+port+"] resources ["+resourcecdir+"]");
