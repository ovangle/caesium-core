import {isBlank, isDefined} from "./lang";

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
    function decorate(target: Object, propName: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        var originalMethod = descriptor.value;
        if (originalMethod.length > 0)
            throw new DecoratorError(`@memoize: Cannot apply to a method with arguments`);
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
