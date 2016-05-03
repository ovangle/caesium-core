"use strict";
function incrementingConverter(input) {
    return input + 1;
}
exports.incrementingConverter = incrementingConverter;
function decrementingConverter(input) {
    return input - 1;
}
exports.decrementingConverter = decrementingConverter;
function toSimpleObjectConverter(input) {
    return { a: input };
}
exports.toSimpleObjectConverter = toSimpleObjectConverter;
function fromSimpleObjectConverter(input) {
    return input.a;
}
exports.fromSimpleObjectConverter = fromSimpleObjectConverter;
function stringReversingConverter(input) {
    return input.split('').reverse().join('');
}
exports.stringReversingConverter = stringReversingConverter;
function intFromStringConverter(input) {
    var result = Number.parseInt(input);
    if (isNaN(result)) {
        throw 'Not a number: ' + input.toString();
    }
    return result;
}
exports.intFromStringConverter = intFromStringConverter;
