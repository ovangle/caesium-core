"use strict";
function composeConverters(fst, snd) {
    return function (input) { return snd(fst(input)); };
}
exports.composeConverters = composeConverters;
function chainConverters() {
    var converters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        converters[_i - 0] = arguments[_i];
    }
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
