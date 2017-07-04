"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const exception_1 = require("./exception");
function* range(startOrStop, stop, step) {
    const min = lang_1.isBlank(stop) ? 0 : startOrStop;
    const max = lang_1.isBlank(stop) ? startOrStop : stop;
    step = lang_1.isBlank(step) ? 1 : step;
    if (step === 0) {
        throw new exception_1.ValueError('\'step\' argument must not be `0`');
    }
    let current = min;
    while ((step > 0 && current < max) || (step < 0 && current > max)) {
        yield current;
        current += step;
    }
}
exports.range = range;
