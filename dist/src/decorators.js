"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require("./lang");
var DecoratorError = (function (_super) {
    __extends(DecoratorError, _super);
    function DecoratorError(errMessage) {
        _super.call(this, 'DecoratorError: ' + errMessage);
    }
    return DecoratorError;
}(Error));
exports.DecoratorError = DecoratorError;
var InstanceCache = (function () {
    function InstanceCache() {
        this._values = {};
    }
    InstanceCache.getCache = function (instance) {
        if (lang_1.isBlank(instance.__instanceCache))
            instance.__instanceCache = new InstanceCache();
        return instance.__instanceCache;
    };
    InstanceCache.prototype.has = function (propName) {
        return lang_1.isDefined(this._values[propName]);
    };
    InstanceCache.prototype.get = function (propName) {
        return this._values[propName];
    };
    InstanceCache.prototype.set = function (propName, value) {
        this._values[propName] = value;
    };
    return InstanceCache;
}());
/**
 *Provides memoization capabilities to javascript objects.
 *
 * Values for expensive (0-argument) method calls annotated with `@memoize`
 * will be cached on the object under the `__instanceCache` attribute.
 */
function memoize() {
    function decorate(target, propName, descriptor) {
        var originalMethod = descriptor.value;
        if (originalMethod.length > 0)
            throw new DecoratorError("@memoize: Cannot apply to a method with arguments");
        var instanceCache = new InstanceCache();
        // Important: Do not use fat arrow syntax. We want the context
        // of `this` in the endpoint to be the same as the instance.
        descriptor.value = function () {
            var cache = InstanceCache.getCache(this);
            if (!cache.has(propName)) {
                cache.set(propName, originalMethod.apply(this));
            }
            return cache.get(propName);
        };
        return descriptor;
    }
    return decorate;
}
exports.memoize = memoize;
