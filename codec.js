"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const converter_1 = require("./converter");
exports.EncodingException = converter_1.EncodingException;
function isCodec(obj) {
    return !lang_1.isBlank(obj)
        && lang_1.isFunction(obj.decode)
        && lang_1.isFunction(obj.encode);
}
exports.isCodec = isCodec;
function getEncoder(obj) {
    if (!isCodec(obj)) {
        if (lang_1.isFunction(obj))
            return obj;
        throw new TypeError(`object is not a codec or converter: ${obj}`);
    }
    return obj.encode.bind(obj);
}
exports.getEncoder = getEncoder;
function getDecoder(obj) {
    if (!isCodec(obj)) {
        if (lang_1.isFunction(obj))
            return obj;
        throw new TypeError(`object is not a codec: ${obj}`);
    }
    return obj.decode.bind(obj);
}
exports.getDecoder = getDecoder;
function composeCodecs(fst, snd) {
    return {
        encode: converter_1.composeConverters(fst.encode, snd.encode),
        decode: converter_1.composeConverters(snd.decode, fst.decode)
    };
}
exports.composeCodecs = composeCodecs;
function chainCodecs(...codecs) {
    return codecs.reduce(composeCodecs, exports.identity);
}
exports.chainCodecs = chainCodecs;
exports.identity = {
    encode: converter_1.identityConverter,
    decode: converter_1.identityConverter
};
