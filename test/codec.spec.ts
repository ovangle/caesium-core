import {identity, composeCodecs, chainCodecs} from '../codec';
import {success, failure} from '../try';
import {incrementingCodec, toSimpleObjectCodec, intToStringCodec, stringReversingCodec} from "./mock/mock_codecs";

export function codecTests() {
    describe('codec', () => {
        identityCodecTests();
        composeCodecTests();
        chainCodecTests();
    });
}

function identityCodecTests() {
    it('should return the argument unchanged on encode', () => {
        expect(identity.encode(52)).toEqual(success(52));
    });
    it('should return the argument unchanged on decode', () => {
        expect(identity.decode('hello world')).toEqual(success('hello world'));
    });
}

function composeCodecTests() {


    it('should be possible to compose two codecs', () => {
        var composition = composeCodecs(incrementingCodec, toSimpleObjectCodec);
        expect(composition.encode(41)).toEqual(success({a: 42}));
    });

    it('should preserve the first failure encountered', () => {
        var composition = composeCodecs(
            {encode: (_) => failure('Encoding error 1'), decode: (_) => failure('Decoding error 1')},
            {encode: (_) => failure('Encoding error 2'), decode: (_) => failure('Decoding error 2')}
        );

        expect(composition.encode('hello world')).toEqual(failure('Encoding error 1'));
        expect(composition.decode('hello world')).toEqual(failure('Decoding error 2'));
    });
}

function chainCodecTests() {
    it('should apply an identity if 0 codecs are changed' , () => {
        var composition = chainCodecs();
        expect(composition.encode(42)).toEqual(success(42));
        expect(composition.decode(42)).toEqual(success(42));
    });

    it('should apply each of the codecs in turn', () => {
        var composition = chainCodecs(
            incrementingCodec,
            intToStringCodec,
            stringReversingCodec
        );

        expect(composition.encode(23)).toEqual(success('42'));
        expect(composition.decode('34')).toEqual(success(42));
    });

    it('should preserve the first failure encountered', () => {
        var failCodec1 = {encode: (_) => failure('Encoding error 1'), decode: (_) => failure('Decoding error 1')};
        var failCodec2 = {encode: (_) => failure('Encoding error 2'), decode: (_) => failure('Decoding error 2')};
        var composition = chainCodecs(
            incrementingCodec,
            failCodec1,
            intToStringCodec,
            failCodec2,
            stringReversingCodec
        );

        expect(composition.encode(23)).toEqual(failure('Encoding error 1'));
        expect(composition.decode('34')).toEqual(failure('Decoding error 2'));
    })

}
