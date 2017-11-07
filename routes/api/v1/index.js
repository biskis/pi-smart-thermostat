/**
 * Created by dani on 05-11-2017.
 */

var Services = require('../../../services');

var apiRoutes = {
    heatLink		: require('./heat_link'),
    thermostat		: require('./thermostat'),

    successHandler: function(req, res, next) {
        res.render = function(data) {
            res.status(200).send(data);
        };

        next();
    },

    errorHandler: function(err, req, res, next) {
        var code = 500;
        var msg = "An unknown error occurred processing your request. Please try again later.";
        if ( err ) {
            msg = err.message || msg;

            console.log(err);
            console.log(err.stack);
        }

        if (err.isPiSmartThermostatApiError) {
            code = err.code;
        }

        res.status(400).json({error: {code: code, msg: msg}});
    }
};


module.exports = function() {
    var express = require('express');
    var app = express();

    app.disable('etag');
    app.use(apiRoutes.successHandler);


    app.get('/', function(req, res) {res.send('Pi Smart Thermostat API V1')});

    // user api
    app.get('/heat_link/on',											        apiRoutes.heatLink.turnOn);
    app.get('/heat_link/off',											        apiRoutes.heatLink.turnOff);
    app.get('/heat_link/status',											    apiRoutes.heatLink.getStatus);

    app.get('/thermostat/temperature',											apiRoutes.thermostat.getTemperature);
    app.get('/thermostat/humidity',											    apiRoutes.thermostat.getHumidity);
    app.get('/thermostat/desire_temp',											apiRoutes.thermostat.getDesireTemperature);

    app.use(apiRoutes.errorHandler);

    return app;
}();