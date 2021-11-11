export function rawToBan(raw: number): number {
    return (Math.round(raw / 100000000000000000000000000000) * 100) / 100;
}

export function msToTime(s: number): string {
    const hours = Math.floor(s / 3600);
    s %= 3600;
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    let timeString = '';
    if (hours) {
        timeString += String(hours).padStart(2, '0') + 'h ';
    }
    if (minutes || hours) {
        timeString += String(minutes).padStart(2, '0') + 'm ';
    }
    timeString += String(seconds).padStart(2, '0') + 's';
    return timeString;
}

export function fixBigNumber(num: number | string): string {
    if (typeof num === 'string') {
        num = parseInt(num);
    }
    return num.toLocaleString();
}

export function getPlaceholderData() {
    return {
        blockStats: [
            { name: 'Current Blocks', value: '123456' },
            { name: 'Cemented Blocks', value: '123456' },
            { name: 'Unchecked Blocks', value: '123456' },
            {
                name: 'Sync Status',
                value: `69%`,
            },
        ],
        nodeStats: [
            { name: 'Version', value: '22.2' },
            { name: 'Database', value: 'not postgresql' },
            { name: 'Node Uptime', value: '01h 01m 01s' },
            { name: 'Peers', value: '55' },
        ],
        nodeAccountStats: [
            {
                name: 'Balance',
                value: `19 BAN`,
            },
            {
                name: 'Pending',
                value: `0 BAN`,
            },
            { name: 'Representative', value: 'ban_1representative123456789address' },
            {
                name: 'Voting Weight',
                value: `2000000 BAN`,
            },
        ],
        systemStats: [
            { name: 'Host', value: 'Host Name' },
            { name: 'Location', value: 'Location Name' },
            { name: 'Load', value: '0.50' },
            {
                name: 'Memory Used',
                value: `19/420 MB`,
            },
        ],
    };
}
