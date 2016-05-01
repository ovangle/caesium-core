import {Try} from '../../try';
import {
    incrementingConverter,
    decrementingConverter,
    fromSimpleObjectConverter,
    toSimpleObjectConverter,
    stringReversingConverter,
    intFromStringConverter
} from './mock_converters';
import {toStringConverter} from "../../converter";

export const incrementingCodec = {
    encode: incrementingConverter,
    decode: decrementingConverter
};

export const toSimpleObjectCodec = {
    encode: toSimpleObjectConverter,
    decode: fromSimpleObjectConverter
};

export const stringReversingCodec = {
    encode: stringReversingConverter,
    decode: stringReversingConverter
};

export const intToStringCodec = {
    encode: toStringConverter,
    decode: intFromStringConverter
};

