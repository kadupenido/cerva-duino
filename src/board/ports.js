module.exports = {
    buzzer: 8,
    circuitTemp: {
        controller: "LM35",
        pin: "A0"
    },
    hltTemp: {
        controller: "DS18B20",
        pin: 2,
        address: 0x317017290ff
    },
    mltTemp: {
        controller: "DS18B20",
        pin: 2,
        address: 0x317251d3aff
    },
    bkTemp: {
        controller: "DS18B20",
        pin: 2,
        address: 0x316010f52ff
    },
    recirculationRelay: 4,
    coolingRelay: 7,
    hltResistance: 6,
    mltResistance: 5,
    bkResistance: 3,
    current: {
        pin: 1,
        voltage: 220
    }
}