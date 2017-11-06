module.exports = {
    "mode": "thermostat", //heatlink | thermostat
    'gpio': {
        "heatlink": 17,
        "thermostat": 4
    },
    "relay": {
        "on": 0,
        "off": 1
    },
    "heatlink": {
        "hostname": "192.168.86.101",
        "port": 8089,
        "path": '/api/v1/heat_link/',
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json'
        }
    },
    "sensor_type": 22,
    "schedule": {
        1: {
            0: 16,
            7: 23
        },
        2: {
            0: 16,
            7: 23
        },
        3: {
            0: 16,
            7: 23
        },
        4: {
            0: 16,
            7: 23
        },
        5: {
            0: 16,
            7: 23
        },
        6: {
            0: 16,
            7: 23,
            10: 22
        },
        7: {
            0: 16,
            7: 23,
            9: 20,
            13: 22,
            17: 20,
            21: 23
        }
    },
    "server": {
        port: 8090
    }
};