import {Try, success, apply} from './try';

/**
 * A simple interface which matches a function
 * which accepts an input and an optional map of
 * options for the converter and returns a value of
 * another type.
 */
export interface Converter<T,R> {
    (arg: T): Try<R>;
}


export function composeConverters<T,U,V>(fst: Converter<T,U>, snd: Converter<U,V>): Converter<T,V> {
    return (arg) => fst(arg).flatMap<V>((input) => snd(input));
}

export function chainConverters(...converters: Converter<any,any>[]): Converter<any,any> {
    return converters.reduce(composeConverters, identityConverter);
}

export function identityConverter<T>(arg: T): Try<T> {
    return success(arg);
}

export function toStringConverter(arg: any): Try<string> {
    return apply<string>(() => arg.toString());
}








