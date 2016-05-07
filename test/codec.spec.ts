import {Converter} from '../src/converter';
import {identity, composeCodecs, chainCodecs, isCodec, Codec, getEncoder, getDecoder} from '../src/codec';
import {incrementingCodec, toSimpleObjectCodec, intToStringCodec, stringReversingCodec} from "./mock/mock_codecs";

export function codecTests() {
    describe('codec', () => {
        identityCodecTests();
        composeCodecTests();
        isCodecTests();
        getEncoderTests();
        getDecoderTests();
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

function isCodecTests() {
    it('should be able to test whether a given object is a codec', () => {
        expect(isCodec(null)).toBe(false, 'null is not a codec');
        expect(isCodec(42)).toBe(false, 'number is not a codec');
        expect(isCodec({encode: 40, decode: 50})).toBe(false, 'encode and decode are not functions');
        //Not actually a codec, but matches the interface.
        expect(isCodec({encode: () => true, decode: () => false}))
            .toBe(true, 'not blank and encode, decode are both functions');
        expect(isCodec(identity))
            .toBe(true, 'identity codec is a codec');
    })
}

class IncrementingCodec implements Codec<number,number> {
    constructor(private incrementBy: number = 1) {}
    encode(i: number) { return i + this.incrementBy; }
    decode(i: number) { return i - this.incrementBy; }
}


function getEncoderTests() {
    describe('getEncoder', () => {
        it('should be possible to get the encoder from a codec', () => {
            var encoder = getDecoder(new IncrementingCodec(15));
            expect(encoder(57)).toBe(42);
        });

        it('should retain the original binding', () => {
            class Foo {
                encoder:Converter<number,number>;

                incrementBy = 15;

                constructor(codec:Codec<number,number>) {
                    this.encoder = getDecoder(codec);
                }
            }
            var foo = new Foo(new IncrementingCodec(1));
            expect(foo.encoder(43)).toBe(42);
        })
    });
}


function getDecoderTests() {
    describe('getDecoder', () => {
        it('should be possible to get the decoder from a codec', () => {
            var encoder = getEncoder(new IncrementingCodec(15));
            expect(encoder(27)).toBe(42);
        });

        it('should retain the original binding', () => {
            class Foo {
                decoder:Converter<number,number>;

                incrementBy = 15;

                constructor(codec:Codec<number,number>) {
                    this.decoder = getEncoder(codec);
                }
            }
            var foo = new Foo(new IncrementingCodec(1));
            expect(foo.decoder(41)).toBe(42);
        })
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
