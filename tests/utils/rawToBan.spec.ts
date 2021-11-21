import { rawToBan } from '@helper/util';

describe.each([
    { raw: 190000000000000000000000000000, expected: 1.9 },
    { raw: 1900000000000000000000000000000, expected: 19 },
    { raw: 19000000000000000000000000000, expected: 0.19 },
    { raw: 190000000000000000000000000, expected: 0 },
    { raw: 1919191919191919191919191919191, expected: 19.19 },
])('$raw raw to ban', ({ raw, expected }) => {
    it(`returns ${expected}`, () => {
        expect(rawToBan(raw)).toBe(expected);
    });
});
