import {isBlank, isDefined, Type, Constructor} from "./lang";

export class DecoratorError extends Error {
    constructor(errMessage) {
        super('DecoratorError: ' + errMessage);
    }
}

class InstanceCache {
    static getCache(instance: any) {
        if (isBlank(instance.__instanceCache))
            instance.__instanceCache = new InstanceCache();
        return instance.__instanceCache;
    }

    _values: {[propName: string]: any} = {};

    has(propName: string) {
        return isDefined(this._values[propName]);
    }

    get(propName: string): any {
        return this._values[propName];
    }

    set(propName: string, value: any) {
        this._values[propName] = value;
    }

}

/**
 *Provides memoization capabilities to javascript objects.
 *
 * Values for expensive (0-argument) method calls annotated with `@memoize`
 * will be cached on the object under the `__instanceCache` attribute.
 */
export function memoize() {
    function cacheValue(propName: string | symbol, getterOrMethod: () => any): () => any {
        return function () {
            let cache = InstanceCache.getCache(this);
            if (!cache.has(propName)) {
                cache.set(propName, getterOrMethod.apply(this));
            }
            return cache.get(propName);
        }
    }

    function decorate(target: Object, propName: string | symbol) {
        let descriptor = Object.getOwnPropertyDescriptor(target, <string>propName);
        let getterOrMethod: () => any;

        if (!isDefined(descriptor))
            throw new DecoratorError(`@memoize: Can only be applied to methods or properties`);

        if (isDefined(descriptor.get)) {
            descriptor.get = cacheValue(propName, descriptor.get);
        } else {
            let method = descriptor.value;
            if (!isDefined(method.length))
                throw new DecoratorError(`@memoize: \'${propName} is not a method`);
            if (method.length > 0)
                throw new DecoratorError(`@memoize: Method \'${propName} should not take arguments`);
            descriptor.value = cacheValue(propName, method);
        }
        return descriptor;
    }
    return decorate;
}

