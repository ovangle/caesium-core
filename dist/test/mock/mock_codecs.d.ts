export declare const incrementingCodec: {
    encode: (input: number) => number;
    decode: (input: any) => number;
};
export declare const toSimpleObjectCodec: {
    encode: (input: number) => {
        a: number;
    };
    decode: (input: {
        a: number;
    }) => number;
};
export declare const stringReversingCodec: {
    encode: (input: string) => string;
    decode: (input: string) => string;
};
export declare const intToStringCodec: {
    encode: (arg: any) => string;
    decode: (input: string) => number;
};
