import {memoize} from '../src/decorators';

export function decoratorTests() {
    describe('decorators', () => {
        memoizeTests();
    });
}

class Cls {
    fooRunCount: number;
    private _foo;

    bazRunCount: number = 0;

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

    @memoize()
    get baz(): number {
        this.bazRunCount += 1;
        return Math.PI;
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

        it('should be possible to memoize a property', () => {
            let instance = new Cls(42);
            expect(instance.bazRunCount).toBe(0);
            expect(instance.baz).toBe(Math.PI);
            expect(instance.bazRunCount).toBe(1);
            expect(instance.baz).toBe(Math.PI, 'accessed from cache');
            expect(instance.bazRunCount).toBe(1, 'body not executed second time');
        });

    });
}
