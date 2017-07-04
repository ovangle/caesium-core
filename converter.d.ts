import { Exception } from './exception';
/**
 * A simple interface which matches a function
 * which accepts an input and an optional map of
 * options for the converter and returns a value of
 * another type.
 */
export interface Converter<T, R> {
    (arg: T): R;
}
export declare class EncodingException extends Exception {
    constructor(message: string);
}
export declare function composeConverters<T, U, V>(fst: Converter<T, U>, snd: Converter<U, V>): Converter<T, V>;
export declare function chainConverters(...converters: Converter<any, any>[]): Converter<any, any>;
export declare function identityConverter<T>(arg: T): T;
export declare function toStringConverter(arg: any): string;
