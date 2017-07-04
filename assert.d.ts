import { Exception } from './exception';
export declare class AssertionError extends Exception {
    constructor(message: string);
}
export declare function assert(test: () => boolean, message?: any): void;
