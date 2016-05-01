/**
 * A simple interface which matches a function
 * which accepts an input and an optional map of
 * options for the converter and returns a value of
 * another type.
 */
export interface Converter<T,R> {
    (arg: T): R;
}


export function composeConverters<T,U,V>(fst: Converter<T,U>, snd: Converter<U,V>): Converter<T,V> {
    return (input) => snd(fst(input));
}

export function chainConverters(...converters: Converter<any,any>[]): Converter<any,any> {
    return converters.reduce(composeConverters, identityConverter);
}

export function identityConverter<T>(arg: T): T {
    return arg;
}

export function toStringConverter(arg: any): string {
    return arg.toString();
}








