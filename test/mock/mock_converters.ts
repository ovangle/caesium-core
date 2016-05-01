import {Converter} from '../../src/converter';
import {Try, success, failure, apply} from '../../src/try';

export function incrementingConverter(input: number): Try<number> {
    return success(input + 1);
}

export function decrementingConverter(input: any): Try<number> {
    return success(input - 1);
}

export function toSimpleObjectConverter(input: number): Try<{a: number}> {
    return success({a: input});
}

export function fromSimpleObjectConverter(input: {a: number}): Try<number> {
    return success(input.a);
}

export function stringReversingConverter(input: string): Try<string> {
    return apply(() => input.split('').reverse().join(''));
}

export function intFromStringConverter(input: string): Try<number> {
    var result = Number.parseInt(input);
    if (isNaN(result)) {
        return failure<number>('Not a number: ' + input.toString());
    }
    return success(result); 
}

