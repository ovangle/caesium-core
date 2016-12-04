export class Exception extends Error {
    name: string;
    message: string;
    stack: any;

    constructor(message) {
        super(message);
        this.name = (this.constructor as any).name;
        this.message = message;
        this.stack = (new Error(message) as any).stack;
    }
}

export class ValueError extends Exception {
    constructor(message: string) {
        super(message);
    }
}

export class ArgumentError extends Exception {
    constructor(message: string) {
        super(message);
    }
}


