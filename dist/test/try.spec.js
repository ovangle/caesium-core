"use strict";
var try_1 = require('../try');
function tryTests() {
    describe('try', function () {
        successTests();
        failureTests();
        applyTests();
    });
}
exports.tryTests = tryTests;
function successTests() {
    describe('Success', function () {
        var x = try_1.success('hello world');
        it('should preserve the failure when mapping a function', function () {
            expect(x.map(function (value) { return value + ', goodbye'; }))
                .toEqual(try_1.success('hello world, goodbye'));
        });
        it('should be a failure if the mapped function throws', function () {
            expect(x.map(function (value) { throw 'An error'; }))
                .toEqual(try_1.failure('An error'));
        });
        it('should preserve the failure when flatMapping a function', function () {
            expect(x.flatMap(function (value) { return try_1.success(value + ', goodbye'); }))
                .toEqual(try_1.success('hello world, goodbye'));
        });
        it('should preserve the original error if the mapping function fails', function () {
            expect(x.flatMap(function (value) { return try_1.failure('An error'); }))
                .toEqual(try_1.failure('An error'));
        });
        it('should run the action in a forEach', function () {
            var executedAction = false;
            x.forEach(function (value) {
                executedAction = true;
                expect(value).toBe('hello world');
            });
            expect(executedAction).toBe(true);
        });
        it('should not return the default for getOrElse', function () {
            expect(x.getOrElse(function () { return '42'; })).toBe('hello world');
        });
    });
}
function failureTests() {
    describe('Failure', function () {
        var x = try_1.failure('An error');
        it('should preserve the failure when mapping a function', function () {
            expect(x.map(function (value) { return true; })).toEqual(x);
        });
        it('should preserve the orignal error if the mapping function throws', function () {
            expect(x.map(function (value) { throw 'Another error'; })).toEqual(x);
        });
        it('should preserve the failure when flatMapping a function', function () {
            expect(x.flatMap(function (value) { return try_1.success(value); })).toEqual(x);
        });
        it('should preserve the original error if the mapping function fails', function () {
            expect(x.flatMap(function (value) { return try_1.failure('Another error'); })).toEqual(x);
        });
        it('should not run the action in a forEach', function () {
            x.forEach(function (value) {
                fail('Action was called');
            });
            expect(true).toEqual(true);
        });
        it('should return the default for getOrElse', function () {
            expect(x.getOrElse(function () { return 42; })).toBe(42);
        });
    });
}
function applyTests() {
    describe('apply', function () {
        it('should return a Success if the argument does not throw', function () {
            function foo() {
                return false;
            }
            expect(try_1.apply(foo)).toEqual(try_1.success(false));
        });
        it('should return a failure if the argument throws', function () {
            function foo() {
                throw 'An error';
            }
            expect(try_1.apply(foo)).toEqual(try_1.failure('An error'));
        });
    });
}
