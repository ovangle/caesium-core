import {Converter} from '../../src/converter';
import {Try, success, failure, apply} from '../../src/try';

export function incrementingConverter(input: number): number {
    return input + 1;
}

export function decrementingConverter(input: any): number {
    return input - 1;
}

export function toSimpleObjectConverter(input: number): {a: number} {
    return {a: input};
}

export function fromSimpleObjectConverter(input: {a: number}): number {
    return input.a;
}

export function stringReversingConverter(input: string): string {
    return input.split('').reverse().join('');
}

export function intFromStringConverter(input: string): number {
    var result = Number.parseInt(input);
    if (isNaN(result)) {
        throw 'Not a number: ' + input.toString();
    }
    return result; 
}

