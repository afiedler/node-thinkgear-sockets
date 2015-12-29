var thinkgear = require('../lib');

var client = thinkgear.createClient();

client.on('data',function(data){
	console.log((new Date).toISOString() + ': ' + JSON.stringify(data));
});

client.connect();
