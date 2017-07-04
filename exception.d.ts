export declare class Exception extends Error {
    name: string;
    message: string;
    stack: any;
    constructor(message: any);
}
export declare class ValueError extends Exception {
    constructor(message: string);
}
export declare class ArgumentError extends Exception {
    constructor(message: string);
}
