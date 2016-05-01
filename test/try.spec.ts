import {apply, success, failure} from '../try';

export function tryTests() {
    describe('try', () => {
        successTests();
        failureTests();
        applyTests();
    });
}


function successTests() {
    describe('Success', () => {
        var x = success<string>('hello world');
        it('should preserve the failure when mapping a function', () => {
            expect(x.map((value) => value + ', goodbye'))
                .toEqual(success('hello world, goodbye'));
        });

        it('should be a failure if the mapped function throws', () => {
            expect(x.map((value) => { throw 'An error'; }))
                .toEqual(failure('An error'));
        });

        it('should preserve the failure when flatMapping a function', () => {
            expect(x.flatMap((value) => success(value + ', goodbye')))
                .toEqual(success('hello world, goodbye'));
        });

        it('should preserve the original error if the mapping function fails', () => {
            expect(x.flatMap((value) => failure('An error')))
                .toEqual(failure('An error'));
        });

        it('should run the action in a forEach', () => {
            var executedAction = false;
            x.forEach((value) => {
               executedAction = true;
               expect(value).toBe('hello world');
            });
            expect(executedAction).toBe(true);
        });

        it('should not return the default for getOrElse', () => {
            expect(x.getOrElse(() => '42')).toBe('hello world');
        });
    });
}

function failureTests() {
    describe('Failure', () => {
        var x = failure('An error');
        it('should preserve the failure when mapping a function', () => {
            expect(x.map((value) => true)).toEqual(x);
        });

        it('should preserve the orignal error if the mapping function throws', () => {
            expect(x.map((value) => { throw 'Another error'; })).toEqual(x);
        });

        it('should preserve the failure when flatMapping a function', () => {
            expect(x.flatMap((value) => success(value))).toEqual(x);
        });

        it('should preserve the original error if the mapping function fails', () => {
            expect(x.flatMap((value) => failure('Another error'))).toEqual(x);
        });

        it('should not run the action in a forEach', () => {
            x.forEach((value) => {
                fail('Action was called');
            });
            expect(true).toEqual(true);
        });

        it('should return the default for getOrElse', () => {
            expect(x.getOrElse(() => 42)).toBe(42);
        });
    });
}

function applyTests() {
    describe('apply', () => {
        it('should return a Success if the argument does not throw', () => {
            function foo(): boolean {
                return false;
            }
            expect(apply<boolean>(foo)).toEqual(success(false));
        });
        it('should return a failure if the argument throws', () => {
            function foo(): boolean {
                throw 'An error';
            }
            expect(apply<boolean>(foo)).toEqual(failure('An error'));
        });
    });
}
