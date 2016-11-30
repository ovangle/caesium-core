
export class Exception extends Error {
    constructor(message) {
        super(message);
    }
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



