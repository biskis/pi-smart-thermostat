/**
 * Created by dani on 07-11-2017.
 */
var Services = require('../../../services');
var ThermostatService = Services.ThermostatService;

module.exports.getTemperature = function(req, res, next) {
    var res_value = ThermostatService.getTemperature();
    res.render(res_value);
};
module.exports.getDesireTemperature = function(req, res, next) {
    var res_value = ThermostatService.getDesireTemperature();
    res.render(res_value);
};
module.exports.getHumidity = function(req, res, next) {
    var res_value = ThermostatService.getHumidity();
    res.render(res_value);
};