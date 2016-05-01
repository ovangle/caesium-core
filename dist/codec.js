"use strict";
var converter_1 = require('./converter');
function composeCodecs(fst, snd) {
    return {
        encode: converter_1.composeConverters(fst.encode, snd.encode),
        decode: converter_1.composeConverters(snd.decode, fst.decode)
    };
}
exports.composeCodecs = composeCodecs;
function chainCodecs() {
    var codecs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        codecs[_i - 0] = arguments[_i];
    }
    return codecs.reduce(composeCodecs, exports.identity);
}
exports.chainCodecs = chainCodecs;
exports.identity = {
    encode: converter_1.identityConverter,
    decode: converter_1.identityConverter
};
