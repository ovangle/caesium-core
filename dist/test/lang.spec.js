"use strict";
var lang_1 = require('../lang');
function langTests() {
    describe('lang', function () {
        isDefinedTests();
        isBlankTests();
        forEachOwnPropertyTests();
    });
}
exports.langTests = langTests;
function isDefinedTests() {
    describe('isDefined', function () {
        it('should test whether a value is defined', function () {
            expect(lang_1.isDefined(undefined)).toBe(false);
            expect(lang_1.isDefined(null)).toBe(true);
            expect(lang_1.isDefined({})).toBe(true);
            expect(lang_1.isDefined(false)).toBe(true);
        });
    });
}
function isBlankTests() {
    describe('isBlank', function () {
        it('should test whether a value is null or undefined', function () {
            expect(lang_1.isBlank(undefined)).toBe(true);
            expect(lang_1.isBlank(null)).toBe(true);
            expect(lang_1.isBlank({})).toBe(false);
            expect(lang_1.isBlank(false)).toBe(false);
        });
    });
}
function forEachOwnPropertyTests() {
    describe('forEachOwnProperty', function () {
        it('should execute a function for each property on the instance', function () {
            var x = { a: 0, b: 1 };
            var seenProperties = [];
            lang_1.forEachOwnProperty(x, function (value, attr) {
                seenProperties.push(attr);
                if (attr === 'a') {
                    expect(value).toBe(0);
                }
                else if (attr === 'b') {
                    expect(value).toBe(1);
                }
                else {
                    fail("Called action on unexpected attribute: " + attr);
                }
            });
            expect(seenProperties).toEqual(['a', 'b']);
        });
        it('should not execute the action for properties on the prototype chain', function () {
            function Foo() {
                this.a = 0;
                this.b = 0;
            }
            Foo.prototype.foo = function () { return this.a + this.b; };
            var x = new Foo();
            var seenProperties = [];
            lang_1.forEachOwnProperty(x, function (value, attr) {
                seenProperties.push(attr);
            });
            expect(seenProperties).toEqual(['a', 'b']);
        });
    });
}
