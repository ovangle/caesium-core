"use strict";
var converter_1 = require('../src/converter');
var mock_converters_1 = require("./mock/mock_converters");
var mock_converters_2 = require("./mock/mock_converters");
function converterTests() {
    describe('converter', function () {
        composeConverterTests();
        chainConverterTests();
        identityConverterTests();
        toStringConverterTests();
    });
}
exports.converterTests = converterTests;
function composeConverterTests() {
    describe('composeConverters', function () {
        it('should return the result of applying the converters in turn', function () {
            var composition = converter_1.composeConverters(mock_converters_1.incrementingConverter, mock_converters_1.toSimpleObjectConverter);
            expect(composition(4)).toEqual({ a: 5 });
        });
    });
}
function chainConverterTests() {
    describe('chainConverters', function () {
        it('chaining 0 converters together should just be the identity converter', function () {
            var chain = converter_1.chainConverters();
            expect(chain(4)).toBe(4);
        });
        it('should return the result of applying all the converters in turn', function () {
            var chain = converter_1.chainConverters(mock_converters_1.incrementingConverter, mock_converters_1.toSimpleObjectConverter);
            expect(chain(10)).toEqual({ a: 11 });
            var chain2 = converter_1.chainConverters(mock_converters_1.incrementingConverter, mock_converters_1.toSimpleObjectConverter, mock_converters_2.fromSimpleObjectConverter);
            expect(chain2(15)).toBe(16);
        });
    });
}
function identityConverterTests() {
    describe('identityConverter', function () {
        it('should return the input unchanged', function () {
            expect(converter_1.identityConverter(true)).toBe(true);
            expect(converter_1.identityConverter(null)).toBe(null);
        });
    });
}
function toStringConverterTests() {
    describe('toStringConverter', function () {
        it('should return the result of calling toString on the input', function () {
            var CustomToString = (function () {
                function CustomToString(value) {
                    this.value = value;
                }
                CustomToString.prototype.toString = function () {
                    return "customToString: " + this.value;
                };
                return CustomToString;
            }());
            var x = new CustomToString('hello world');
            expect(converter_1.toStringConverter(x)).toEqual('customToString: hello world');
        });
    });
}
