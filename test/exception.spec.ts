import {Exception} from '../src/exception';

class MyException extends Exception {
    constructor(message) {
        super(message);
    }
}

export function exceptionTests() {

    describe('exceptions', () => {
        it('should have the basic error properties', () => {
            let exception = new MyException('error');
            expect(exception.name).toEqual('MyException');
            expect(exception instanceof Error).toBe(true);
            expect(exception.message).toEqual('error');
        });
    });
}
