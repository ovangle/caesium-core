export declare function isDefined(obj: any): boolean;
export declare function isBlank(obj: any): boolean;
export declare function isFunction(obj: any): boolean;
export declare function isNumber(obj: any): boolean;
export declare function isBoolean(obj: any): boolean;
export declare function isString(obj: any): boolean;
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
/**
 * Iterates over the properties declared directly.
 * Ignores properties on the prototype chain.
 * @param obj
 * The map-like object
 * @param action
 * The function to apply.
 */
export declare function forEachOwnProperty(obj: any, action: (value: any, attr: string) => void): void;
export declare function getOwnProperties(obj: any): string[];
