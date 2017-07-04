"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.stack = new Error(message).stack;
    }
}
exports.Exception = Exception;
class ValueError extends Exception {
    constructor(message) {
        super(message);
    }
}
exports.ValueError = ValueError;
class ArgumentError extends Exception {
    constructor(message) {
        super(message);
    }
}
exports.ArgumentError = ArgumentError;
