import {isBlank} from './lang';
import {ValueError} from './exception';



export function* range(startOrStop: number, stop?: number, step?: number): IterableIterator<number> {
    const min = isBlank(stop) ? 0 : startOrStop;
    const max = isBlank(stop) ? startOrStop: stop;

    step = isBlank(step) ? 1 : step;

    if (step === 0) {
        throw new ValueError('\'step\' argument must not be `0`');
    }
    let current = min;

    while ((step > 0 && current < max) || (step < 0 && current > max)) {
        yield current;
        current += step;
    }


}
