module.exports = function(RED) {
	var lwrf = require("lightwaverf");

    function LightwaveRF(config) {
        RED.nodes.createNode(this,config);
	    var node = this;

       	this.wifilink = RED.nodes.getNode(config.ip);
       	var lw = new lwrf({ip:this.wifilink.ip});

        this.on('input', function(msg) {
        	var node = this;

        	var msg;
        	var payload = "empty";

        	if (config.action=="on"){
        		this.log("turning the device "+ config.device+" on, in room "+config.room);
        		lw.turnDeviceOn(config.room, config.device, function(error, content) {node.log(error); node.log(content);});
        	} else if (config.action=="off"){
        		this.log("turning the device "+ config.device+" off, in room "+config.room);
        		lw.turnDeviceOff(config.room, config.device, function(error, content) {node.log(error); node.log(content);});
        	} else if (config.action=="dim"){
        		this.log("dimming the device");
        		lw.setDeviceDim(config.room, config.device, config.dim, function(error, content) {node.log(error); node.log(content);});
        	} 

        });
    }
    RED.nodes.registerType("lightwaverf",LightwaveRF);
}