const i2c = require('i2c-bus');
const i2cBus = i2c.openSync(1);
const bus = require('oled-i2c-bus');
const oled = new bus(i2cBus, {width: 128, height: 64, address: 0x3C});
const font = require('oled-font-5x7');
const config = require("../config.json");
let RT = config.RT;

module.exports = class screen {
    constructor() {
        this.run = async function () {
            oled.clearDisplay();
            oled.turnOnDisplay();
            this.updateScreen();
        };
        this.updateScreen = function () {
            oled.clearDisplay();
            oled.setCursor(100, 1);
            oled.writeString(font, 1, "x" + multiplier.toString());
            oled.setCursor(1, 1);
            oled.writeString(font, 1, config.PS);
            oled.setCursor(1, 15);
            oled.writeString(font, 1, RT, 1, true);
            oled.setCursor(40, 40);
            oled.writeString(font, 2, (Math.round(freq * 10) / 10).toFixed(1) + " FM");
        };
        this.stop = function () {
            oled.update();
            oled.clearDisplay();
            oled.turnOffDisplay();
        };
        this.miniMessage = function (message) {
            oled.setCursor(1, 40);
            oled.writeString(font, 2, message);
            setTimeout(function () {
                new screen().updateScreen();
            }, 2000);
        };
    }
};