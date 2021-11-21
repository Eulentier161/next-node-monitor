import { sToTime } from '@helper/util';

describe.each([
    { seconds: 1, expected: '01s' },
    { seconds: 79, expected: '01m 19s' },
    { seconds: 3600, expected: '01h 00m 00s' },
    { seconds: 6909559, expected: '1919h 19m 19s' },
])('$seconds seconds to time string', ({ seconds, expected }) => {
    it(`returns ${expected}`, () => {
        expect(sToTime(seconds)).toBe(expected);
    });
});
