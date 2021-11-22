import { getConfirmationHistory } from '@helper/axios';

export function rawToBan(raw: number): number {
    return Math.round((raw / 100000000000000000000000000000) * 100) / 100;
}

export function sToTime(s: number): string {
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

export function getBlockSync(nodeBlockCount: number, averageBlockCount: number): number {
    const percent = Math.round((nodeBlockCount / averageBlockCount) * 100);
    if (percent > 100) {
        return 100;
    }
    return percent;
}

export function getConfirmationDurationPercentile(percentile: number, array: Confirmation[]) {
    if (!array.length) {
        return 0;
    }
    array = array.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    const index = (percentile / 100) * array.length;
    return Math.floor(parseInt(array[Math.floor(index)].duration));
}

export async function getConfirmationInfo(): Promise<ConfirmationInfo> {
    const confirmationHistory = await getConfirmationHistory();
    const confirmations = confirmationHistory.confirmations.sort((a, b) => parseFloat(b.time) - parseFloat(a.time));
    const confirmationsCompact = confirmations.filter(
        (confirmation) => parseInt(confirmation.time) >= parseInt(confirmations[0].time) - 600000
    );
    const durationTotal = confirmationsCompact.reduce((sum, confirmation) => sum + parseInt(confirmation.duration), 0);
    const count = confirmationsCompact.length;

    return {
        count,
        timeSpan:
            parseInt(confirmationsCompact[0].time) -
            parseInt(confirmationsCompact[confirmationsCompact.length - 1].time),
        average: count ? Math.round(durationTotal / count) : 0,
        percentile50: getConfirmationDurationPercentile(50, confirmationsCompact),
        percentile75: getConfirmationDurationPercentile(75, confirmationsCompact),
        percentile90: getConfirmationDurationPercentile(90, confirmationsCompact),
        percentile95: getConfirmationDurationPercentile(95, confirmationsCompact),
        percentile99: getConfirmationDurationPercentile(99, confirmationsCompact),
    };
}
