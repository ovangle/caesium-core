"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
/**
 * Test whether the "boolean" attribute of an element
 * is `true` or `false`
 *
 * This is so we can either assign boolean attributes
 * as either:
 * <my-element [booleanAttribute]="true"></my-element>
 * or
 * <my-element booleanAttribute></my-element>
 *
 */
function attributeIsPresent(value) {
    if (value === true || value === false) {
        return value;
    }
    return !lang_1.isBlank(value);
}
exports.attributeIsPresent = attributeIsPresent;
