"use strict";
var Success = (function () {
    function Success(value) {
        this.isSuccess = true;
        this.value = value;
    }
    Success.prototype.flatMap = function (foo) {
        return foo(this.value);
    };
    Success.prototype.map = function (foo) {
        var _this = this;
        return apply(function () { return foo(_this.value); });
    };
    Success.prototype.forEach = function (action) {
        action(this.value);
    };
    Success.prototype.get = function () {
        return this.value;
    };
    Success.prototype.getOrElse = function (orElse) {
        return this.value;
    };
    return Success;
}());
var Failure = (function () {
    function Failure(error) {
        this.isSuccess = false;
        this.error = error;
    }
    Failure.prototype.flatMap = function (foo) {
        return new Failure(this.error);
    };
    Failure.prototype.map = function (foo) {
        return new Failure(this.error);
    };
    Failure.prototype.forEach = function (action) {
    };
    Failure.prototype.getOrElse = function (orElse) {
        return orElse();
    };
    Failure.prototype.get = function () {
        throw this.error;
    };
    return Failure;
}());
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
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        if (!value.isSuccess) {
            return failure(value.error);
        }
        result.push(value.get());
    }
    return success(result);
}
exports.trySequence = trySequence;
