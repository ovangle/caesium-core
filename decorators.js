"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
class DecoratorError extends Error {
    constructor(errMessage) {
        super('DecoratorError: ' + errMessage);
    }
}
exports.DecoratorError = DecoratorError;
class InstanceCache {
    constructor() {
        this._values = {};
    }
    static getCache(instance) {
        if (lang_1.isBlank(instance.__instanceCache))
            instance.__instanceCache = new InstanceCache();
        return instance.__instanceCache;
    }
    has(propName) {
        return lang_1.isDefined(this._values[propName]);
    }
    get(propName) {
        return this._values[propName];
    }
    set(propName, value) {
        this._values[propName] = value;
    }
}
/**
 *Provides memoization capabilities to javascript objects.
 *
 * Values for expensive (0-argument) method calls annotated with `@memoize`
 * will be cached on the object under the `__instanceCache` attribute.
 */
function memoize() {
    function cacheValue(propName, getterOrMethod) {
        return function () {
            let cache = InstanceCache.getCache(this);
            if (!cache.has(propName)) {
                cache.set(propName, getterOrMethod.apply(this));
            }
            return cache.get(propName);
        };
    }
    function decorate(target, propName) {
        let descriptor = Object.getOwnPropertyDescriptor(target, propName);
        let getterOrMethod;
        if (!lang_1.isDefined(descriptor))
            throw new DecoratorError(`@memoize: Can only be applied to methods or properties`);
        if (lang_1.isDefined(descriptor.get)) {
            descriptor.get = cacheValue(propName, descriptor.get);
        }
        else {
            let method = descriptor.value;
            if (!lang_1.isDefined(method.length))
                throw new DecoratorError(`@memoize: \'${propName} is not a method`);
            if (method.length > 0)
                throw new DecoratorError(`@memoize: Method \'${propName} should not take arguments`);
            descriptor.value = cacheValue(propName, method);
        }
        return descriptor;
    }
    return decorate;
}
exports.memoize = memoize;
