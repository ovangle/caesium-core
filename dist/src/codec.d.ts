import { Converter } from './converter';
export interface Codec<T, R> {
    encode: Converter<T, R>;
    decode: Converter<R, T>;
}
export declare function composeCodecs<T, U, V>(fst: Codec<T, U>, snd: Codec<U, V>): Codec<T, V>;
export declare function chainCodecs(...codecs: Codec<any, any>[]): Codec<any, any>;
export declare const identity: Codec<any, any>;
