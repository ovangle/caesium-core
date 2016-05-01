"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var decorators_1 = require('../decorators');
function decoratorTests() {
    describe('decorators', function () {
        memoizeTests();
    });
}
exports.decoratorTests = decoratorTests;
var Cls = (function () {
    function Cls(foo) {
        this.fooRunCount = 0;
        this._foo = foo;
    }
    Cls.prototype.foo = function () {
        this.fooRunCount += 1;
        return this._foo;
    };
    Cls.prototype.bar = function () {
        return 0;
    };
    __decorate([
        decorators_1.memoize(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Number)
    ], Cls.prototype, "foo", null);
    __decorate([
        decorators_1.memoize(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Number)
    ], Cls.prototype, "bar", null);
    return Cls;
}());
function memoizeTests() {
    describe('memoize', function () {
        it('Should cache the return value of Cls.foo()', function () {
            var instance = new Cls(42);
            expect(instance.foo()).toBe(42, 'Computed value');
            expect(instance.foo()).toBe(42, 'Value same when accessed from cache');
        });
        it('Cls.foo should only compute an answer once', function () {
            var instance = new Cls(42);
            expect(instance.fooRunCount).toBe(0, 'foo() not called');
            instance.foo();
            expect(instance.fooRunCount).toBe(1, 'foo() computed value');
            instance.foo();
            expect(instance.fooRunCount).toBe(1, 'foo() retrieved from cache');
        });
        it('multiple memoized methods should not interfere with each other', function () {
            var instance = new Cls(42);
            expect(instance.foo()).toBe(42, 'cache foo()');
            expect(instance.bar()).toBe(0, 'cache bar()');
            expect(instance.foo()).toBe(42, 'access foo() from cache');
        });
    });
}
