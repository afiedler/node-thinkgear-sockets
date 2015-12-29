# node-thinkgear-sockets

Client library for the [ThinkGear Socket Protocol](http://developer.neurosky.com/docs/lib/exe/fetch.php?media=app_notes:thinkgear_socket_protocol.pdf) from [NeuroSky](http://neurosky.com/).

This library is based on [`node-neurosky`](https://github.com/dluxemburg/node-neurosky), but updated to work with
ThinkGear Connect 4.1.8.

## Usage

Install with NPM:

```
$ npm install node-thinkgear-sockets
```


Include the module:

```javascript
var thinkgear = require('node-thinkgear-sockets');
```

Create a client instance:

```javascript
var client = thinkgear.createClient({ enableRawOutput: true });
```

### Data Events

Clients fire three types of data events: `blink_data`, `raw_data`, `data`. You can add a listener like this:

```javascript
client.on('data',function(data){

	// magical and wonderful things

});
```

### Connect to the headset

Connect to the headset like this:

```javascript
client.connect();
```

All of this is in the `example/app.js` file too.

### Troubleshooting
Make sure that your headset is paired and connected before you start the Node app. It may take 5-10 seconds for data to
start streaming to your Node app after you make the connection.

The ThinkGear Connector app will multiplex connections to the headset, so if you are unsure if your connection is
working correctly, you can use the included "Brainwave Visualizer App" while your Node app is running. If data is
streaming correctly to the Brainwave Visualizer, then it should be streaming correctly to your Node app as well.


## Data

### `data` events

The output of `data` events looks like this:

```javascript
{
	eSense: {
		attention: 53,
		meditation: 47
	},
	eegPower: {
		delta: 416474,
		theta: 33592,
		lowAlpha: 3877,
		highAlpha: 3142,
		lowBeta: 1569,
		highBeta: 3125,
		lowGamma: 3521,
		highGamma: 1451
	},
	poorSignalLevel: 0
}
```

### `blink_data` events

Example: `{ blinkStrength: 55 }`

### `raw_data` events

Example: `{ rawEeg: 43 }`

Note that `raw_data` events stream at a rate of about 500 per second, so make sure your event handlers are relatively
quick!

### TODO

- Tests
- Use Node Streams for raw data to add some buffering

