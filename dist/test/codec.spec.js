"use strict";
var codec_1 = require('../src/codec');
var mock_codecs_1 = require("./mock/mock_codecs");
function codecTests() {
    describe('codec', function () {
        identityCodecTests();
        composeCodecTests();
        chainCodecTests();
    });
}
exports.codecTests = codecTests;
function identityCodecTests() {
    it('should return the argument unchanged on encode', function () {
        expect(codec_1.identity.encode(52)).toBe(52);
    });
    it('should return the argument unchanged on decode', function () {
        expect(codec_1.identity.decode('hello world')).toBe('hello world');
    });
}
function composeCodecTests() {
    it('should be possible to compose two codecs', function () {
        var composition = codec_1.composeCodecs(mock_codecs_1.incrementingCodec, mock_codecs_1.toSimpleObjectCodec);
        expect(composition.encode(41)).toEqual({ a: 42 });
        expect(composition.decode({ a: 43 })).toBe(42);
    });
}
function chainCodecTests() {
    it('should apply an identity if 0 codecs are changed', function () {
        var composition = codec_1.chainCodecs();
        expect(composition.encode(42)).toBe(42);
        expect(composition.decode(42)).toBe(42);
    });
    it('should apply each of the codecs in turn', function () {
        var composition = codec_1.chainCodecs(mock_codecs_1.incrementingCodec, mock_codecs_1.intToStringCodec, mock_codecs_1.stringReversingCodec);
        expect(composition.encode(23)).toBe('42');
        expect(composition.decode('34')).toBe(42);
    });
}
