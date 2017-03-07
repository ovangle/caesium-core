import {range} from '../src/math';

export function mathTests() {
    describe('math', () => {
        rangeTests();
    });
}

function rangeTests() {
    describe('range', () => {
        it('should generate a range betweeen the start and stop values, separated by step', () => {
            expect(Array.from(range(0, 10, 1))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'step increments of 1')

            expect(Array.from(range(0, 10, 2))).toEqual([0, 2, 4, 6, 8], 'step increments of 2');
            expect(Array.from(range(10, 0, 2))).toEqual([], 'step increments of 2, start > stop');

            expect(Array.from(range(0, 10, -2))).toEqual([], 'step increments of -2, stop > start');
            expect(Array.from(range(10, 0, -2))).toEqual([10, 8, 6, 4, 2], 'step increments of -2, start < stop');

            expect(Array.from(range(0, 9, 2))).toEqual([0, 2, 4, 6, 8], 'stop not divisible by step');
        });

        it('should be callable with one or two arguments', () => {
            expect(Array.from(range(10))).toEqual([0,1,2,3,4,5,6,7,8,9]);
            expect(Array.from(range(10, 20))).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
        })
    })
}
