

export interface Try<T> {
    isSuccess: boolean;

    flatMap<U>(foo: (arg: T) => Try<U>): Try<U>
    map<U>(foo: (arg: T) => U): Try<U>;
    forEach(foo: (arg: T) => any): void;

    /// Gets the value or rethrows the exception on failure
    get(): T;
    getOrElse(ifElse: () => T): T;
}

class Success<T> implements Try<T> {
    value: T;

    isSuccess = true;

    constructor(value: T) {
        this.value = value;
    }

    flatMap<U>(foo: (arg: T) => Try<U>): Try<U> {
        return foo(this.value);
    }

    map<U>(foo: (arg: T) => U): Try<U> {
        return apply<U>(() => foo(this.value));
    }

    forEach(action: (value) => any): void {
        action(this.value);
    }
    
    get(): T {
        return this.value;
    }

    getOrElse(orElse: () => T): T {
        return this.value;
    }

}

class Failure<T> implements Try<T> {
    isSuccess = false;
    error:any;

    constructor(error:any) {
        this.error = error;
    }

    flatMap<U>(foo:(arg:T) => Try<U>):Try<U> {
        return new Failure<U>(this.error);
    }

    map<U>(foo:(arg:T) => U):Try<U> {
        return new Failure<U>(this.error);
    }

    forEach(action:(value) => any):void {
    }

    getOrElse(orElse:() => T):T {
        return orElse();
    }

    get(): T {
        throw this.error;
    }
}


// monad return
export function apply<T>(foo: () => T): Try<T> {
    try {
        return new Success<T>(foo());
    } catch (e) {
        return new Failure<T>(e);
    }
}

export function success<T>(value: T): Try<T> {
    return new Success<T>(value);
}

export function failure<T>(errorMessage: string): Try<T> {
    return new Failure<T>(errorMessage);
}

