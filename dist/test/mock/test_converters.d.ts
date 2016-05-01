import { Converter } from '../../src/converter';
import { Try } from '../../src/try';
export declare function incrementingConverter(input: number): Try<number>;
export declare function toSimpleObjectConverter(input: number): Try<{
    a: number;
}>;
export declare function fromSimpleObjectConverter(input: {
    a: number;
}): Try<number>;
export declare function mkFailingConverter(errMessage: string): Converter<any, any>;
