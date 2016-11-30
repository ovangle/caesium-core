import {Exception} from './exception';


export class AssertionError extends Exception {
    constructor(message: string) {
        super('AssertionError: ' + message);
    }
}

export function assert(test: () => boolean, message?: any) {
    if (test()) {
        throw new AssertionError(message);
    }
}
