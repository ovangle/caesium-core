"use strict";
var mock_converters_1 = require('./mock_converters');
var converter_1 = require("../../src/converter");
exports.incrementingCodec = {
    encode: mock_converters_1.incrementingConverter,
    decode: mock_converters_1.decrementingConverter
};
exports.toSimpleObjectCodec = {
    encode: mock_converters_1.toSimpleObjectConverter,
    decode: mock_converters_1.fromSimpleObjectConverter
};
exports.stringReversingCodec = {
    encode: mock_converters_1.stringReversingConverter,
    decode: mock_converters_1.stringReversingConverter
};
exports.intToStringCodec = {
    encode: converter_1.toStringConverter,
    decode: mock_converters_1.intFromStringConverter
};
