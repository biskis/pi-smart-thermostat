/**
 * Created by dani on 06-11-2017.
 */
var config = require("config");
var moment = require('moment-timezone');
var sensor = require('node-dht-sensor');

var JsonDB = require('node-json-db');
var db = new JsonDB("piSmartThermostat", true, false);


var ThermostatService = {

    getTemperature: function () {
        return parseInt(db.getData("/temp"));
    },

    updateSensorData: function(){
        sensor.read(config.get('sensor_type'), config.get('gpio.thermostat'), function(err, temperature, humidity) {
            if (!err) {
                db.push("/temp", temperature.toFixed(1));   //c
                db.push("/humidity", humidity.toFixed(1));  //%
                console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
                    'humidity: ' + humidity.toFixed(1) + '%'
                );
            }
        });
    },

    checkIfShouldRun: function () {
        var currentTemperature = this.getTemperature();
        var desireTemperature = config.get("desire_temp");

        if(currentTemperature < desireTemperature) {
            //Start heatlink
            this.callHeatLink('on');
        } else {
            //Close heatlink
            this.callHeatLink('off');
        }

    },

    callHeatLink: function(onOff) {
        var options = config.get("heatlink");
        options.path += onOff;

        http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        }).end();
    }



};

module.exports = ThermostatService;