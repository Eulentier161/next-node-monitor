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

describe.each([
    { percentile: 50, confirmations: generateArray(1919).map((i) => generateConfirmation(i)) },
    { percentile: 29, confirmations: generateArray(42069).map((i) => generateConfirmation(i)) },
    { percentile: 69, confirmations: generateArray(5672).map((i) => generateConfirmation(i)) },
    { percentile: 95, confirmations: generateArray(86780).map((i) => generateConfirmation(i)) },
    { percentile: 97, confirmations: generateArray(567520).map((i) => generateConfirmation(i)) },
    { percentile: 98, confirmations: generateArray(32468).map((i) => generateConfirmation(i)) },
    { percentile: 99, confirmations: generateArray(9102365).map((i) => generateConfirmation(i)) },
])('percentiles for durations of the recent confirmations', ({ percentile, confirmations }) => {
    it(`returns ${confirmations[Math.floor((percentile / 100) * confirmations.length)].duration}`, () => {
        expect(getConfirmationDurationPercentile(percentile, confirmations)).toBe(
            parseFloat(confirmations[Math.floor((percentile / 100) * confirmations.length)].duration)
        );
    });
});
