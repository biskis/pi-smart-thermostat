/**
 * Created by dani on 05-11-2017.
 */
var config = require("config");
var moment = require('moment-timezone');
var Gpio = require('pigpio').Gpio;

var relay = null;

var HeatLinkService = {

    _getRelayGpioPin: function() {
        if(relay === null) {
            relay = new Gpio(config.get("gpio.heatlink"), {mode: Gpio.OUTPUT});
        }
        return relay;
    },

    turnOn: function () {
        this._getRelayGpioPin().digitalWrite(config.get("relay.on"));

        return "1";
    },
    turnOff: function(){
        this._getRelayGpioPin().digitalWrite(config.get("relay.off"));

        return "0";
    },
    getStatus: function () {
        try {
            return this._getRelayGpioPin().digitalRead() + "";  //cast to string.
        } catch(error) {

        }
        return "0";
    },

};

module.exports = HeatLinkService;