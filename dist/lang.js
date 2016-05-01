"use strict";
/// Test whether the argument is undefined
function isDefined(obj) {
    return typeof obj !== "undefined";
}
exports.isDefined = isDefined;
/// Test whether object is null or undefined
function isBlank(obj) {
    return obj === null || typeof obj === "undefined";
}
exports.isBlank = isBlank;
/**
 * Iterates over the properties declared directly.
 * Ignores properties on the prototype chain.
 * @param obj
 * The map-like object
 * @param action
 * The function to apply.
 */
function forEachOwnProperty(obj, action) {
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            action(obj[attr], attr);
        }
    }
}
exports.forEachOwnProperty = forEachOwnProperty;
function getOwnProperties(obj) {
    var properties = [];
    forEachOwnProperty(obj, function (value, key) {
        properties.push(key);
    });
    return properties;
}
exports.getOwnProperties = getOwnProperties;
