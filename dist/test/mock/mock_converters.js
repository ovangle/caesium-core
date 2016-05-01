"use strict";
var try_1 = require('../../try');
function incrementingConverter(input) {
    return try_1.success(input + 1);
}
exports.incrementingConverter = incrementingConverter;
function decrementingConverter(input) {
    return try_1.success(input - 1);
}
exports.decrementingConverter = decrementingConverter;
function toSimpleObjectConverter(input) {
    return try_1.success({ a: input });
}
exports.toSimpleObjectConverter = toSimpleObjectConverter;
function fromSimpleObjectConverter(input) {
    return try_1.success(input.a);
}
exports.fromSimpleObjectConverter = fromSimpleObjectConverter;
function stringReversingConverter(input) {
    return try_1.apply(function () { return input.split('').reverse().join(''); });
}
exports.stringReversingConverter = stringReversingConverter;
function intFromStringConverter(input) {
    var result = Number.parseInt(input);
    if (isNaN(result)) {
        return try_1.failure('Not a number: ' + input.toString());
    }
    return try_1.success(result);
}
exports.intFromStringConverter = intFromStringConverter;
