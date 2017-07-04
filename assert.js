"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("./exception");
class AssertionError extends exception_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.AssertionError = AssertionError;
function assert(test, message) {
    if (test()) {
        throw new AssertionError(message);
    }
}
exports.assert = assert;
