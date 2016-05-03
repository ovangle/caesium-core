import {Converter, composeConverters, identityConverter} from './converter';

export interface Codec<T,R> {
    encode: Converter<T,R>;
    decode: Converter<R,T>;
}

export function composeCodecs<T,U,V>(fst: Codec<T,U>, snd: Codec<U,V>): Codec<T,V> {
    return {
        encode: composeConverters(fst.encode, snd.encode),
        decode: composeConverters(snd.decode, fst.decode)
    };
}

export function chainCodecs(...codecs: Codec<any,any>[]) {
    return codecs.reduce(composeCodecs, identity);
}

export const identity: Codec<any,any> = {
    encode: identityConverter,
    decode: identityConverter
};

