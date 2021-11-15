import { getConfirmationHistory } from '@helper/axios';

export function rawToBan(raw: number): number {
    return (Math.round(raw / 100000000000000000000000000000) * 100) / 100;
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

function getConfirmationDurationPercentile(percentile: number, array: Confirmation[]) {
    if (!array.length) {
        return 0;
    }
    const index = (percentile / 100) * array.length;
    if (Math.floor(index) == index) {
        return Math.round(parseInt(array[index - 1].duration) + parseInt(array[index].duration) / 2);
    } else {
        return Math.round(parseInt(array[Math.floor(index)].duration));
    }
}

export async function getConfirmationInfo(): Promise<ConfirmationInfo> {
    const confirmationHistory = await getConfirmationHistory();
    const confirmationsCompact = confirmationHistory.confirmations.filter(
        (confirmation) =>
            parseInt(confirmation.time) >=
            parseInt(confirmationHistory.confirmations[confirmationHistory.confirmations.length - 1].time) - 600000
    );
    const durationTotal = confirmationsCompact.reduce((sum, confirmation) => sum + parseInt(confirmation.duration), 0);
    const count = confirmationsCompact.length;
    const average = count ? Math.round(durationTotal / count) : 0;
    const time_span =
        parseInt(confirmationsCompact[confirmationsCompact.length - 1].time) - parseInt(confirmationsCompact[0].time);
    const percentile50 = getConfirmationDurationPercentile(50, confirmationsCompact);
    const percentile75 = getConfirmationDurationPercentile(75, confirmationsCompact);
    const percentile90 = getConfirmationDurationPercentile(90, confirmationsCompact);
    const percentile95 = getConfirmationDurationPercentile(95, confirmationsCompact);
    const percentile99 = getConfirmationDurationPercentile(99, confirmationsCompact);

    return { count, time_span, average, percentile50, percentile75, percentile90, percentile95, percentile99 };
}
