
/// Test whether the argument is undefined
export function isDefined(obj: any): boolean {
    return typeof obj !== "undefined";
}

/// Test whether object is null or undefined
export function isBlank(obj: any): boolean {
    return obj === null || typeof obj === "undefined";
}

export function isFunction(obj: any): boolean {
    return typeof obj === "function";
}

export function isNumber(obj: any): boolean {
    return !isBlank(obj) && typeof obj === "number";
}

export function isBoolean(obj: any): boolean {
    return !isBlank(obj) && typeof obj === "boolean";
}

export type Type = Function;

/**
 * Iterates over the properties declared directly.
 * Ignores properties on the prototype chain.
 * @param obj
 * The map-like object
 * @param action
 * The function to apply.
 */
export function forEachOwnProperty(obj: any, action: (value: any, attr: string) => void) {
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            action(obj[attr], attr);
        }
    }
}

export function getOwnProperties(obj: any): string[] {
    var properties = [];
    forEachOwnProperty(obj, (value, key) => {
        properties.push(key);
    });
    return properties;
}

