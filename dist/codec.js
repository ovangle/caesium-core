"use strict";
var try_1 = require('./try');
function composeCodecs(fst, snd) {
    return {
        encode: function (arg) { return fst.encode(arg).flatMap(snd.encode); },
        decode: function (arg) { return snd.decode(arg).flatMap(fst.decode); }
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
    encode: function (arg) { return try_1.success(arg); },
    decode: function (arg) { return try_1.success(arg); }
};
