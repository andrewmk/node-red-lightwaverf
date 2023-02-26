module.exports = function(RED) {
	var lwrf = require("lightwaverf");

    function LightwaveRF(config) {
        RED.nodes.createNode(this,config);
	    var node = this;

       	this.wifilink = RED.nodes.getNode(config.ip);
       	var lw = new lwrf({ip:this.wifilink.ip});

        node.on('close', function() {
                lw.sendSocket.close();
                lw.receiveSocket.close();

        });

        this.on('input', function(msg) {
        	var node = this;

        	var msg;
        	var payload = "empty";

                node.warn("Room: " + msg.room + ", Device: " + msg.device + ", Action: " + msg.action + ", Dim: " + msg.dim);

                if (msg.room) {
                        room = msg.room;
                } else {
                        room = config.room;
                }

                if (msg.device) {
                        device = msg.device;
                } else {
                        device = config.device;
                }

                if (msg.action) {
                        action = msg.action;
                } else {
                        action = config.action;
                }

                if (msg.dim) {
                        dim = msg.dim;
                } else {
                        dim = config.dim;
                }

        	if (action=="on"){
        		node.warn("turning the device " + device + " on, in room " + room);
        		lw.turnDeviceOn(room, device, function(error, content) {
                                if (error) {
                                        node.error(error);
                                } else {
                                        node.warn(content);
                                }
                        });
        	} else if (action=="off"){
        		node.warn("turning the device " + device + " off, in room " + room);
        		lw.turnDeviceOff(room, device, function(error, content) {
                                if (error) {
                                        node.error(error);
                                } else {
                                        node.warn(content);
                                }
                        });
        	} else if (action=="dim"){
        		node.warn("dimming the device " + device + " to " + dim + " in room " + room);
        		lw.setDeviceDim(room, device, dim, function(error, content) {
                                if (error) {
                                        node.error(error);
                                } else {
                                        node.warn(content);
                                }
                        });
        	} 

		node.send(msg);
        });
    }
    RED.nodes.registerType("lightwaverf",LightwaveRF);
}
