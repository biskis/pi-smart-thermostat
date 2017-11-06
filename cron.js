var config = require('config');
var Services = require('./services');
var ThermostatService = Services.ThermostatService;

var execute = module.exports.execute = function() {
    setInterval(function () {
        console.log('Update sensor data');
        ThermostatService.updateSensorData();
    }, 1000 * 60); // once per minute

    setInterval(function () {
        console.log('Running Refresh calendar channels cron...');
        ThermostatService.checkIfShouldRun();
    }, 1000 * 60 * 5); // once per 5 minute


};

execute();