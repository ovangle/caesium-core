import { Converter, EncodingException } from './converter';
export { Converter, EncodingException };
export interface Codec<T, R> {
    encode: Converter<T, R>;
    decode: Converter<R, T>;
}
export declare function isCodec(obj: any): boolean;
export declare function getEncoder<T, U>(obj: Codec<T, U> | Converter<T, U>): Converter<T, U>;
export declare function getDecoder<T, U>(obj: Codec<T, U> | Converter<U, T>): Converter<U, T>;
export declare function composeCodecs<T, U, V>(fst: Codec<T, U>, snd: Codec<U, V>): Codec<T, V>;
export declare function chainCodecs(...codecs: Codec<any, any>[]): Codec<any, any>;
export declare const identity: Codec<any, any>;
