"use strict";
var codec_1 = require('../codec');
var try_1 = require('../try');
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
        expect(codec_1.identity.encode(52)).toEqual(try_1.success(52));
    });
    it('should return the argument unchanged on decode', function () {
        expect(codec_1.identity.decode('hello world')).toEqual(try_1.success('hello world'));
    });
}
function composeCodecTests() {
    it('should be possible to compose two codecs', function () {
        var composition = codec_1.composeCodecs(mock_codecs_1.incrementingCodec, mock_codecs_1.toSimpleObjectCodec);
        expect(composition.encode(41)).toEqual(try_1.success({ a: 42 }));
    });
    it('should preserve the first failure encountered', function () {
        var composition = codec_1.composeCodecs({ encode: function (_) { return try_1.failure('Encoding error 1'); }, decode: function (_) { return try_1.failure('Decoding error 1'); } }, { encode: function (_) { return try_1.failure('Encoding error 2'); }, decode: function (_) { return try_1.failure('Decoding error 2'); } });
        expect(composition.encode('hello world')).toEqual(try_1.failure('Encoding error 1'));
        expect(composition.decode('hello world')).toEqual(try_1.failure('Decoding error 2'));
    });
}
function chainCodecTests() {
    it('should apply an identity if 0 codecs are changed', function () {
        var composition = codec_1.chainCodecs();
        expect(composition.encode(42)).toEqual(try_1.success(42));
        expect(composition.decode(42)).toEqual(try_1.success(42));
    });
    it('should apply each of the codecs in turn', function () {
        var composition = codec_1.chainCodecs(mock_codecs_1.incrementingCodec, mock_codecs_1.intToStringCodec, mock_codecs_1.stringReversingCodec);
        expect(composition.encode(23)).toEqual(try_1.success('42'));
        expect(composition.decode('34')).toEqual(try_1.success(42));
    });
    it('should preserve the first failure encountered', function () {
        var failCodec1 = { encode: function (_) { return try_1.failure('Encoding error 1'); }, decode: function (_) { return try_1.failure('Decoding error 1'); } };
        var failCodec2 = { encode: function (_) { return try_1.failure('Encoding error 2'); }, decode: function (_) { return try_1.failure('Decoding error 2'); } };
        var composition = codec_1.chainCodecs(mock_codecs_1.incrementingCodec, failCodec1, mock_codecs_1.intToStringCodec, failCodec2, mock_codecs_1.stringReversingCodec);
        expect(composition.encode(23)).toEqual(try_1.failure('Encoding error 1'));
        expect(composition.decode('34')).toEqual(try_1.failure('Decoding error 2'));
    });
}
