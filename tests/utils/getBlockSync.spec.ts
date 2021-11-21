import { getBlockSync } from '@helper/util';

describe.each([
    { nodeBlockCount: 50, averageBlockCount: 100, expected: 50 },
    { nodeBlockCount: 99.9, averageBlockCount: 100, expected: 100 },
    { nodeBlockCount: 100, averageBlockCount: 99.9, expected: 100 },
    { nodeBlockCount: 100, averageBlockCount: 50, expected: 100 },
])(
    '$nodeBlockCount and $averageBlockCount return sync percentage not more than 100',
    ({ nodeBlockCount, averageBlockCount, expected }) => {
        it(`returns ${expected}`, () => {
            expect(getBlockSync(nodeBlockCount, averageBlockCount)).toBe(expected);
        });
    }
);
