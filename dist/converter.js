"use strict";
var try_1 = require('./try');
function composeConverters(fst, snd) {
    return function (arg) { return fst(arg).flatMap(function (input) { return snd(input); }); };
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
    return try_1.success(arg);
}
exports.identityConverter = identityConverter;
function toStringConverter(arg) {
    return try_1.apply(function () { return arg.toString(); });
}
exports.toStringConverter = toStringConverter;
