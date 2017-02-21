# Changelog

## 0.2.3
- Exception now extends error correctly

## 0.2.2
- No changes, bad publish

## 0.2.1
- Add 'assert' module, move `assert` and `AssertionError` from 'exceptions' into module.
- Add EncodingException to 'converter' module
- codec module now exports Converter, EncodingException

## 0.2.0
- lang.Type now accepts a mandatory generic type argument

- Added 'exception' module
    - Exposes an `Exception` class which subclasses `Error`, as well as
        ValueError, ArgumentError, AssertionError subclasses.
    - Also exposes an 'assert' utility function.
- Allow a Converter to be passed as argument to the `codec.getEncoder`, `codec.getDecoder` functions.
- decorators.memoize can now be applied to a gettable property

## 0.1.3
- Bump reflect-metadata dependency to ~0.1.8

## 0.1.2
- Added exceptions module, replacing the one from caesium-model with
  more generic error types
- Slight performance improvements for checking basic types in lang.

## 0.1.1
- Added isNumber, isBoolean, isString helpers to lang

## 0.1.0

- Added isFunction helper to lang
- Added isCodec, getEncoder, getDecoder functions to codec



