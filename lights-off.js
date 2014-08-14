module.exports = function(RED) {
	var LightwaveRF = require("lightwaverf");

    function LightsOff(config) {
        RED.nodes.createNode(this,config);
	    var node = this;
        this.on('input', function(msg) {

        	this.wifilink = RED.nodes.getNode(config.ip);

        	this.log(this.wifilink);
        	this.log(this.wifilink.ip);
        	this.log(config);

			var lw = new LightwaveRF({ip:this.wifilink.ip});
			//var lw = new LightwaveRF({ip:"192.168.1.66"});
    
			var payload = lw.turnDeviceOff(1 /*roomId*/, 2 /*deviceId*/, function(error, content) {
			    if (error) {
			        return "Error turning device on " + error.message;
			    } else {
			        return "Response: " + content;
			    }
			});
			var msg;
			msg.payload = payload;
	        node.send(msg);

        });
    }
    RED.nodes.registerType("lights-off",LightsOff);
}