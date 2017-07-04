"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Success {
    constructor(value) {
        this.isSuccess = true;
        this.value = value;
    }
    flatMap(foo) {
        return foo(this.value);
    }
    map(foo) {
        return apply(() => foo(this.value));
    }
    forEach(action) {
        action(this.value);
    }
    get() {
        return this.value;
    }
    getOrElse(orElse) {
        return this.value;
    }
}
class Failure {
    constructor(error) {
        this.isSuccess = false;
        this.error = error;
    }
    flatMap(foo) {
        return new Failure(this.error);
    }
    map(foo) {
        return new Failure(this.error);
    }
    forEach(action) {
    }
    getOrElse(orElse) {
        return orElse();
    }
    get() {
        throw this.error;
    }
}
// monad return
function apply(foo) {
    try {
        return new Success(foo());
    }
    catch (e) {
        return new Failure(e);
    }
}
exports.apply = apply;
function success(value) {
    return new Success(value);
}
exports.success = success;
function failure(errorMessage) {
    return new Failure(errorMessage);
}
exports.failure = failure;
function trySequence(values) {
    var result = [];
    for (let value of values) {
        if (!value.isSuccess) {
            return failure(value.error);
        }
        result.push(value.get());
    }
    return success(result);
}
exports.trySequence = trySequence;
