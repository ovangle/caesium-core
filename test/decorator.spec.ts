import {memoize} from '../src/decorators';

export function decoratorTests() {
    describe('decorators', () => {
        memoizeTests();
    });
}

class Cls {
    fooRunCount: number;
    private _foo;
    constructor(foo: number) {
        this.fooRunCount = 0;
        this._foo = foo;
    }
    @memoize()
    foo(): number {
        this.fooRunCount += 1;
        return this._foo;
    }
    @memoize()
    bar(): number {
        return 0;
    }
}

function memoizeTests() {
    describe('memoize', () => {
        it('Should cache the return value of Cls.foo()', () => {
            var instance = new Cls(42);
            expect(instance.foo()).toBe(42, 'Computed value');
            expect(instance.foo()).toBe(42, 'Value same when accessed from cache');
        });
        
        it('Cls.foo should only compute an answer once', () => {
            var instance = new Cls(42);
            expect(instance.fooRunCount).toBe(0, 'foo() not called');
            instance.foo();
            expect(instance.fooRunCount).toBe(1, 'foo() computed value');
            instance.foo();
            expect(instance.fooRunCount).toBe(1, 'foo() retrieved from cache');
        });
        
        it('multiple memoized methods should not interfere with each other', () => {
            var instance = new Cls(42);
            expect(instance.foo()).toBe(42, 'cache foo()');
            expect(instance.bar()).toBe(0, 'cache bar()');
            expect(instance.foo()).toBe(42, 'access foo() from cache');
        });

    });
}
