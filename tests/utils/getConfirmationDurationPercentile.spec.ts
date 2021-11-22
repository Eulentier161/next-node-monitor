import { getConfirmationDurationPercentile } from '@helper/util';

function generateConfirmation(duration: number): Confirmation {
    return {
        time: 'time',
        blocks: 'blocks',
        duration: duration.toString(),
        hash: 'hash',
        request_count: 'request_count',
        tally: 'tally',
        voters: 'voters',
    };
}

function generateArray(length: number): number[] {
    return Array.from({ length }, (_, k) => k + 1);
}

function shuffle(array: number[]): number[] {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const percentiles = [50, 75, 90, 95, 99];

describe.each([
    { percentiles, confirmations: shuffle(generateArray(1919)).map((i) => generateConfirmation(i)) },
    { percentiles, confirmations: shuffle(generateArray(42069)).map((i) => generateConfirmation(i)) },
    { percentiles, confirmations: shuffle(generateArray(12345)).map((i) => generateConfirmation(i)) },
])('percentiles for durations of the recent confirmations', ({ percentiles, confirmations }) => {
    percentiles.forEach((percentile) =>
        it(`returns ${confirmations[Math.floor((percentile / 100) * confirmations.length)].duration}`, () => {
            expect(getConfirmationDurationPercentile(percentile, confirmations)).toBe(
                parseFloat(confirmations[Math.floor((percentile / 100) * confirmations.length)].duration)
            );
        })
    );
});
