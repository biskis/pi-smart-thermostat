var util = require('util');
function PiSmartThermostatApiError(code, message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    this.message = message;
    this.code = code;

    this.name = 'PiSmartThermostatError';
    this.isPiSmartThermostatApiError = true;
}

PiSmartThermostatApiError.prototype.__proto__ = Error.prototype;

module.exports = {
    Unknown: function() {
        return new PiSmartThermostatApiError(0, 'An unknown error occurred processing your request. Please try again later.');
    },
    InvalidValue: function() {
        return new PiSmartThermostatApiError(1, 'Invalid value.');
    }
};
