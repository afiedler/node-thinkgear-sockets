var net = require('net'),
	events = require('events'),
	util = require('util');

var ThinkGearClient = function(opts) {
	opts || (opts = {});

	this.port = opts.port || 13854;
	this.host = opts.host || 'localhost';
	this.onConnectError = opts.onConnectError instanceof Function ? opts.onConnectError : null;

	var enableRawOutput = !!opts.enableRawOutput;

	this.config = {
		enableRawOutput: enableRawOutput,
		format: "Json"
	};

	events.EventEmitter.call(this);
};

util.inherits(ThinkGearClient, events.EventEmitter);

ThinkGearClient.prototype.connect = function() {
	var self = this;

	var client = this.client = net.connect(this.port, this.host, function() {
		client.write(JSON.stringify(self.config));
	});

	client.on('data',function(data){
    try {
      var json = JSON.parse(data.toString());
      if(json['rawEeg']) {
        self.emit('raw_data', json);
      } else if(json['blinkStrength']) {
        self.emit('blink_data', json);
      } else {
        self.emit('data', json);
      }
    } catch(e) {
      self.emit('parse_error', data.toString());
    }
	});

	if (self.onConnectError) {
		client.on('error', function(err) {
			self.onConnectError(err);
		});
	}
};

exports.ThinkGearClient = ThinkGearClient;

exports.createClient = function(opts) {
	return new ThinkGearClient(opts || {});
};