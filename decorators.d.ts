export declare class DecoratorError extends Error {
    constructor(errMessage: any);
}
/**
 *Provides memoization capabilities to javascript objects.
 *
 * Values for expensive (0-argument) method calls annotated with `@memoize`
 * will be cached on the object under the `__instanceCache` attribute.
 */
export declare function memoize(): (target: Object, propName: string | symbol) => PropertyDescriptor;
