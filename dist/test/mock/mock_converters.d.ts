import { Try } from '../../try';
export declare function incrementingConverter(input: number): Try<number>;
export declare function decrementingConverter(input: any): Try<number>;
export declare function toSimpleObjectConverter(input: number): Try<{
    a: number;
}>;
export declare function fromSimpleObjectConverter(input: {
    a: number;
}): Try<number>;
export declare function stringReversingConverter(input: string): Try<string>;
export declare function intFromStringConverter(input: string): Try<number>;
