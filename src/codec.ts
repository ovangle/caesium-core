import {Converter} from './converter';
import {success} from './try';

export interface Codec<T,R> {
    encode: Converter<T,R>;
    decode: Converter<R,T>;
}

export function composeCodecs<T,U,V>(fst: Codec<T,U>, snd: Codec<U,V>): Codec<T,V> {
    return {
        encode: (arg) => fst.encode(arg).flatMap(snd.encode),
        decode: (arg) => snd.decode(arg).flatMap(fst.decode)
    };
}

export function chainCodecs(...codecs: Codec<any,any>[]) {
    return codecs.reduce(composeCodecs, identity);
}

export const identity: Codec<any,any> = {
    encode: (arg: any) => success(arg),
    decode: (arg: any) => success(arg)
};

