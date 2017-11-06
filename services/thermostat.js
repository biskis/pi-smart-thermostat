/**
 * Created by dani on 06-11-2017.
 */
var config = require("config");
var moment = require('moment-timezone');
var sensor = require('node-dht-sensor');
var http = require('http');

var JsonDB = require('node-json-db');
var db = new JsonDB("piSmartThermostat", true, false);


var ThermostatService = {

    getTemperature: function () {
        return parseInt(db.getData("/temp"));
    },
    getDesireTemperature: function () {
        var desireTemp = 0;
        var schedule = config.get("schedule");
        var todaySchedule = schedule[moment().isoWeekday()];
        for(hour in todaySchedule) {
            if(hour <= moment().hour() ) {
                desireTemp = todaySchedule[hour];
            }
        }
        return desireTemp;
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
        var desireTemperature = this.getDesireTemperature();

        console.log("Now is: " + currentTemperature + " and we want to be: " + desireTemperature);

        if(currentTemperature < desireTemperature) {
            //Start heatlink
            this.callHeatLink('on');
        } else {
            //Close heatlink
            this.callHeatLink('off');
        }

    },

    callHeatLink: function(onOff) {
        console.log("Turn heatlink to " + onOff);
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