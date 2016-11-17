
export class Exception implements Error {
    private _error: Error;

    constructor(message) {
        this._error = new Error(message);
    }

    get name(): string { return this._error.name; }
    get message(): string { return this._error.message; }
    get stack() { return (this._error as any).stack; }
}


export class ValueError extends Exception {
    constructor(message: string) {
        super('ValueError: ' + message);
    }
}

export class ArgumentError extends Exception {
    constructor(message: string) {
        super('ArgumentError: ' + message);
    }
}

export class AssertionError extends Exception {
    constructor(message: string) {
        super('AssertionError: ' + message);
    }
}

export function assert(test: () => boolean, message?: any) {
    if (test()) {
        throw new AssertionError(message || `${test.toString()}`);
    }
}

