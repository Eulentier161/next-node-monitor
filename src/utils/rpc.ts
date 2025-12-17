import { cached } from "@/utils/cached";
import type {
  Confirmation,
  ConfirmationInfo,
  AccountInfo,
  BlockCount,
  ConfirmationHistory,
  Stats,
  Telemetry,
  TelemetryAvg,
  Version,
} from "./types";
import { cache } from "react";
import "server-only";

const rpcEndpoint = `http://${process.env.NODE_RPC_HOST || "localhost"}:${process.env.NODE_RPC_PORT}`;

async function rpcCall<T>(body: object): Promise<T> {
  const res = await fetch(rpcEndpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await res.json();
}

export const getBlockCount = cache(cached(async () => await rpcCall<BlockCount>({ action: "block_count" })));

export const getTelemetryAvg = cache(cached(async () => await rpcCall<TelemetryAvg>({ action: "telemetry" })));

export const getTelemetry = cache(
  cached(
    async () =>
      await rpcCall<Telemetry>({
        action: "telemetry",
        address: "127.0.0.1",
        port: process.env.NODE_TCP_PORT,
      })
  )
);

export const getVersion = cache(cached(async () => await rpcCall<Version>({ action: "version" })));

export const getAccountInfo = cache(
  cached(
    async () =>
      await rpcCall<AccountInfo>({
        action: "account_info",
        account: process.env.NODE_REPRESENTATIVE,
        representative: true,
        weight: true,
        pending: true,
      })
  )
);

export const getStats = cache(cached(async () => await rpcCall<Stats>({ action: "stats", type: "counters" })));

export const getConfirmationHistory = cache(
  cached(async () => await rpcCall<ConfirmationHistory>({ action: "confirmation_history" }))
);

function getConfirmationDurationPercentile(percentile: number, confirmations: Confirmation[]) {
  if (!confirmations.length) {
    return 0;
  }
  confirmations = confirmations.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
  const index = Math.floor((percentile / 100) * confirmations.length);
  return Math.floor(parseFloat(confirmations[index].duration));
}

export const getConfirmationInfo = cache(
  cached(async (): Promise<ConfirmationInfo> => {
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
  })
);
