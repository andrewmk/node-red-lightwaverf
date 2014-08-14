module.exports = function(RED) {
    function LightwaveRFWifilink(n) {
        RED.nodes.createNode(this,n);
        this.ip = n.ip;
        this.log(this.ip);
    }
    RED.nodes.registerType("lightwaverf-wifi-link",LightwaveRFWifilink);
}