import {isFunction, isBlank} from './lang';
import {Converter, composeConverters, identityConverter} from './converter';

export interface Codec<T,R> {
    encode: Converter<T,R>;
    decode: Converter<R,T>;
}

export function isCodec(obj: any): boolean {
    return !isBlank(obj)
        && isFunction(obj.decode)
        && isFunction(obj.encode);
}

export function getEncoder<T,U>(obj: Codec<T,U>): Converter<T,U>{
    if (!isCodec(obj))
        throw new TypeError(`object is not a codec: ${obj}`);
    return obj.encode.bind(obj);
}

export function getDecoder<T,U>(obj: Codec<T,U>): Converter<U,T> {
    if (!isCodec(obj))
        throw new TypeError(`object is not a codec: ${obj}`);
    return obj.decode.bind(obj);

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

