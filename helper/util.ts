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

export function getConfirmationDurationPercentile(percentile: number, confirmations: Confirmation[]) {
    if (!confirmations.length) {
        return 0;
    }
    confirmations = confirmations.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    const index = Math.floor((percentile / 100) * confirmations.length);
    return Math.floor(parseFloat(confirmations[index].duration));
}

export async function getConfirmationInfo(): Promise<ConfirmationInfo> {
    const confirmationHistory = await getConfirmationHistory();
    if (!parseFloat(confirmationHistory.confirmation_stats.count)) {
        return {
            count: 0,
            time_span: 0,
            average: 0,
            percentile50: 0,
            percentile75: 0,
            percentile90: 0,
            percentile95: 0,
            percentile99: 0,
        };
    }
    const confirmations = confirmationHistory.confirmations.sort((a, b) => parseFloat(b.time) - parseFloat(a.time));
    const confirmationsCompact = confirmations.filter(
        (confirmation) => parseFloat(confirmation.time) >= parseFloat(confirmations[0].time) - 600000
    );
    const durationTotal = confirmationsCompact.reduce(
        (sum, confirmation) => sum + parseFloat(confirmation.duration),
        0
    );
    const count = confirmationsCompact.length;
    return {
        count,
        time_span:
            parseFloat(confirmationsCompact[0].time) -
            parseFloat(confirmationsCompact[confirmationsCompact.length - 1].time),
        average: count ? Math.round(durationTotal / count) : 0,
        percentile50: getConfirmationDurationPercentile(50, confirmationsCompact),
        percentile75: getConfirmationDurationPercentile(75, confirmationsCompact),
        percentile90: getConfirmationDurationPercentile(90, confirmationsCompact),
        percentile95: getConfirmationDurationPercentile(95, confirmationsCompact),
        percentile99: getConfirmationDurationPercentile(99, confirmationsCompact),
    };
}
