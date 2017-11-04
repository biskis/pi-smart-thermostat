/**
 * Created by dani on 05-11-2017.
 */
var Services = require('../../../services');
var HeatLinkService = Services.HeatLinkService;

module.exports.turnOn = function(req, res, next) {
    var res_value = HeatLinkService.turnOn();
    res.render(res_value);
};
module.exports.turnOff = function(req, res, next) {
    var res_value = HeatLinkService.turnOff();
    res.render(res_value);
};
module.exports.getStatus = function(req, res, next) {
    var res_value = HeatLinkService.getStatus();
    res.render(res_value + "");
};