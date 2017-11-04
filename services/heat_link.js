/**
 * Created by dani on 05-11-2017.
 */
var config = require("config");
var moment = require('moment-timezone');
var Gpio = require('pigpio').Gpio;

var relay = null;

// var JsonDB = require('node-json-db');
// var db = new JsonDB("piSmartThermostatControl", true, false);

var HeatLinkService = {

    _getRelayGpioPin: function() {
        if(relay === null) {
            relay = new Gpio(config.get("gpio.heatlink"), {mode: Gpio.OUTPUT});
        }
        return relay;
    },

    turnOn: function () {
        this._getRelayGpioPin().digitalWrite(1);

        // db.push("/master_relay", "1");

        return "1";
    },
    turnOff: function(){
        this._getRelayGpioPin().digitalWrite(0);
        // db.push("/master_relay", "0");

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