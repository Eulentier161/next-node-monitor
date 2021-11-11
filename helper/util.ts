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
