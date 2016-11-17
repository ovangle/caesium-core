import {isDefined, isBlank, isFunction, forEachOwnProperty, isNumber, isBoolean, isString} from '../src/lang';

export function langTests() {
    describe('lang', () => {
        isDefinedTests();
        isBlankTests();
        isFunctionTests();
        isNumberTests();
        isBooleanTests();
        isStringTests();
        forEachOwnPropertyTests();
    });
}

function isDefinedTests() {
    describe('isDefined', () => {
        it('should test whether a value is defined', () => {
            expect(isDefined(undefined)).toBe(false);
            expect(isDefined(null)).toBe(true);
            expect(isDefined({})).toBe(true);
            expect(isDefined(false)).toBe(true);
        });
    });
}

function isBlankTests() {
    describe('isBlank', () => {
        it('should test whether a value is null or undefined', () => {
            expect(isBlank(undefined)).toBe(true);
            expect(isBlank(null)).toBe(true);
            expect(isBlank({})).toBe(false);
            expect(isBlank(false)).toBe(false);
        });
    });
}

function isNumberTests() {
    describe('isNumber', () => {
        it('should test whether the given object is a number', () => {
            expect(isNumber(true)).toBe(false);
            expect(isNumber('4')).toBe(false);
            expect(isNumber(null)).toBe(false);
            expect(isNumber(4)).toBe(true);
        });
    });
}

function isBooleanTests() {
    describe('isBoolean', () => {
        it('should test whether the given object is a number', () => {
            expect(isBoolean(true)).toBe(true);
            expect(isBoolean('4')).toBe(false);
            expect(isBoolean(null)).toBe(false);
            expect(isBoolean(4)).toBe(false);
        });
    })
}

function isStringTests() {
    describe('isString', () => {
        it('should test whether the given object is a number', () => {
            expect(isString(true)).toBe(false);
            expect(isString('4')).toBe(true);
            expect(isString(null)).toBe(false);
            expect(isString(4)).toBe(false);
        });
    })
}

function isFunctionTests() {
    describe('isFunction', () => {
        it('should test whether the given object is a function', () => {
            expect(isFunction(function() { })).toBe(true);
            expect(isFunction(null)).toBe(false);
            expect(isFunction(undefined)).toBe(false);
            expect(isFunction({'hello': 'world'})).toBe(false);
        });
    });
}

function forEachOwnPropertyTests() {
    describe('forEachOwnProperty', () => {
        it('should execute a function for each property on the instance', () => {
            var x = {a: 0, b: 1};

            var seenProperties = [];
            forEachOwnProperty(x, (value, attr) => {
                seenProperties.push(attr);
                if (attr === 'a') {
                    expect(value).toBe(0);
                } else if (attr === 'b') {
                    expect(value).toBe(1);
                } else {
                    fail(`Called action on unexpected attribute: ${attr}`);
                }
            });

            expect(seenProperties).toEqual(['a','b']);
        });

        it('should not execute the action for properties on the prototype chain', () => {
            function Foo() {
                this.a = 0;
                this.b = 0;
            }
            Foo.prototype.foo = function() { return this.a + this.b; };

            var x = new Foo();

            var seenProperties = [];
            forEachOwnProperty(x, (value, attr) => {
                seenProperties.push(attr);
            });

            expect(seenProperties).toEqual(['a','b']);
        });
    });
}
