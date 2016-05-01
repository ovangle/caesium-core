import {success, failure} from '../src/try';
import {composeConverters, chainConverters, identityConverter, toStringConverter} from '../src/converter';
import {incrementingConverter, toSimpleObjectConverter} from "./mock/mock_converters";
import {fromSimpleObjectConverter} from "./mock/mock_converters";

export function converterTests() {
    describe('converter', () => {
        composeConverterTests();
        chainConverterTests();
        identityConverterTests();
        toStringConverterTests();
    });
}

function composeConverterTests() {
    describe('composeConverters', () => {
        it('should return the result of applying the converters in turn', () => {
            var composition = composeConverters(incrementingConverter, toSimpleObjectConverter);
            expect(composition(4)).toEqual(success({a: 5}));
        });

        it('should preserve the error if the first converter failed', () => {
            function failingConverter(_) {
                return failure('An error');
            }
            var composition = composeConverters(failingConverter, toSimpleObjectConverter);
            expect(composition(5)).toEqual(failure('An error'));
        });
    });
}

function chainConverterTests() {
    describe('chainConverters', () => {
        it('chaining 0 converters together should just be the identity converter', () => {
            var chain = chainConverters();
            expect(chain(4)).toEqual(success(4));
        });

        it('should return the result of applying all the converters in turn', () => {
            var chain = chainConverters(
                incrementingConverter,
                toSimpleObjectConverter
            );
            expect(chain(10)).toEqual(success({a: 11}));

            var chain2 = chainConverters(
                incrementingConverter,
                toSimpleObjectConverter,
                fromSimpleObjectConverter
            );
            expect(chain2(15)).toEqual(success(16))
        });

        it('should preserve the failure if multiple converters fail', () => {
            var chain = chainConverters(
                incrementingConverter,
                (input) => failure('An error'),
                toSimpleObjectConverter,
                (input) => failure('Another error')
            );
            expect(chain(11)).toEqual(failure('An error'));

        });

    });
}

function identityConverterTests() {
    describe('identityConverter', () => {
        it('should return the input unchanged', () => {
            expect(identityConverter(true)).toEqual(success(true));
            expect(identityConverter(null)).toEqual(success(null));
        })
    });
}

function toStringConverterTests() {
    describe('toStringConverter', () => {
        it('should return the result of calling toString on the input', () => {
            class CustomToString {
                constructor(private value: string) {}
                toString() {
                    return `customToString: ${this.value}`
                }
            }

            var x = new CustomToString('hello world');
            expect(toStringConverter(x)).toEqual(success('customToString: hello world'));
        });

        it('should fail if the toString method throws', () => {
            class CustomToString {
                constructor(private value: string) {}
                toString() {
                    throw 'toString throws';
                }
            }

            var x = new CustomToString('hello world');
            expect(toStringConverter(x)).toEqual(failure('toString throws'))
        });

    });

}
