import {identity, composeCodecs, chainCodecs} from '../src/codec';
import {success, failure} from '../src/try';
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
        expect(identity.encode(52)).toBe(52);
    });
    it('should return the argument unchanged on decode', () => {
        expect(identity.decode('hello world')).toBe('hello world');
    });
}

function composeCodecTests() {
    it('should be possible to compose two codecs', () => {
        var composition = composeCodecs(incrementingCodec, toSimpleObjectCodec);
        expect(composition.encode(41)).toEqual({a: 42});
        expect(composition.decode({a: 43})).toBe(42);
    });
}

function chainCodecTests() {
    it('should apply an identity if 0 codecs are changed' , () => {
        var composition = chainCodecs();
        expect(composition.encode(42)).toBe(42);
        expect(composition.decode(42)).toBe(42);
    });

    it('should apply each of the codecs in turn', () => {
        var composition = chainCodecs(
            incrementingCodec,
            intToStringCodec,
            stringReversingCodec
        );

        expect(composition.encode(23)).toBe('42');
        expect(composition.decode('34')).toBe(42);
    });

}
