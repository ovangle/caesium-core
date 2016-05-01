export interface Try<T> {
    isSuccess: boolean;
    error?: any;
    flatMap<U>(foo: (arg: T) => Try<U>): Try<U>;
    map<U>(foo: (arg: T) => U): Try<U>;
    forEach(foo: (arg: T) => any): void;
    get(): T;
    getOrElse(ifElse: () => T): T;
}
export declare function apply<T>(foo: () => T): Try<T>;
export declare function success<T>(value: T): Try<T>;
export declare function failure<T>(errorMessage: any): Try<T>;
export declare function trySequence<T>(values: Try<T>[]): Try<T[]>;
