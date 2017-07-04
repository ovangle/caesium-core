"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("./exception");
class EncodingException extends exception_1.Exception {
    constructor(message) {
        super(message);
    }
}
exports.EncodingException = EncodingException;
function composeConverters(fst, snd) {
    return (input) => snd(fst(input));
}
exports.composeConverters = composeConverters;
function chainConverters(...converters) {
    return converters.reduce(composeConverters, identityConverter);
}
exports.chainConverters = chainConverters;
function identityConverter(arg) {
    return arg;
}
exports.identityConverter = identityConverter;
function toStringConverter(arg) {
    return arg.toString();
}
exports.toStringConverter = toStringConverter;
