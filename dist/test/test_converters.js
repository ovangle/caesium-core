"use strict";
var try_1 = require('../src/try');
function incrementingConverter(input) {
    return try_1.success(input + 1);
}
exports.incrementingConverter = incrementingConverter;
function toSimpleObjectConverter(input) {
    return try_1.success({ a: input });
}
exports.toSimpleObjectConverter = toSimpleObjectConverter;
function fromSimpleObjectConverter(input) {
    return try_1.success(input.a);
}
exports.fromSimpleObjectConverter = fromSimpleObjectConverter;
function mkFailingConverter(errMessage) {
    return function (input) { return try_1.failure(errMessage); };
}
exports.mkFailingConverter = mkFailingConverter;
