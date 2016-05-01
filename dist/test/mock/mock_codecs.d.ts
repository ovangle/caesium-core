import { Try } from '../../try';
export declare const incrementingCodec: {
    encode: (input: number) => Try<number>;
    decode: (input: any) => Try<number>;
};
export declare const toSimpleObjectCodec: {
    encode: (input: number) => Try<{
        a: number;
    }>;
    decode: (input: {
        a: number;
    }) => Try<number>;
};
export declare const stringReversingCodec: {
    encode: (input: string) => Try<string>;
    decode: (input: string) => Try<string>;
};
export declare const intToStringCodec: {
    encode: (arg: any) => Try<string>;
    decode: (input: string) => Try<number>;
};
