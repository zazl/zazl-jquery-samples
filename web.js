/*
* The MIT License (MIT)
* 
* Copyright (c) 2013 Richard Backhouse
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
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

console.log("Zazl Demonstration Samples for Dojo running on port ["+port+"] examples ["+resourcecdir+"]");
