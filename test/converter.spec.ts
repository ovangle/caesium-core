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
            expect(composition(4)).toEqual({a: 5});
        });
    });
}

function chainConverterTests() {
    describe('chainConverters', () => {
        it('chaining 0 converters together should just be the identity converter', () => {
            var chain = chainConverters();
            expect(chain(4)).toBe(4);
        });

        it('should return the result of applying all the converters in turn', () => {
            var chain = chainConverters(
                incrementingConverter,
                toSimpleObjectConverter
            );
            expect(chain(10)).toEqual({a: 11});

            var chain2 = chainConverters(
                incrementingConverter,
                toSimpleObjectConverter,
                fromSimpleObjectConverter
            );
            expect(chain2(15)).toBe(16);
        });
    });
}

function identityConverterTests() {
    describe('identityConverter', () => {
        it('should return the input unchanged', () => {
            expect(identityConverter(true)).toBe(true);
            expect(identityConverter(null)).toBe(null);
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
            expect(toStringConverter(x)).toEqual('customToString: hello world');
        });
    });

}
