import { getAccountInfo, getConfirmationInfo, getStats, getTelemetry, getTelemetryAvg, getVersion } from "@/utils/rpc";
import { getCpuLoadAverage, getMemoryInfo } from "@/utils/sys";
import { raw_to_whole } from "@/utils/raw_to_whole";
import { NextResponse } from "next/server";

export async function GET() {
  const [accountInfo, confirmationInfo, stats, telemetry, telemetryAvg, version, cpuLoadAverage, memoryInfo] =
    await Promise.all([
      getAccountInfo(),
      getConfirmationInfo(),
      getStats(),
      getTelemetry(),
      getTelemetryAvg(),
      getVersion(),
      getCpuLoadAverage(),
      getMemoryInfo(),
    ]);

  const nodeBlockCount = parseInt(telemetry.block_count);
  const blockSync = Math.min(100, Math.round((nodeBlockCount / parseInt(telemetryAvg.block_count)) * 100));

  return NextResponse.json({
    node_account: process.env.NODE_REPRESENTATIVE,
    version: version.node_vendor,
    store_version: parseInt(version.store_version),
    protocol_version: parseInt(version.protocol_version),
    store_vendor: version.store_vendor,
    current_block: nodeBlockCount,
    unchecked_blocks: parseInt(telemetry.unchecked_count),
    cemented_blocks: parseInt(telemetry.cemented_count),
    num_peers: parseInt(telemetry.peer_count),
    confirmation_info: confirmationInfo,
    acc_balance_raw: accountInfo.balance,
    acc_balance: parseFloat(raw_to_whole(BigInt(accountInfo.balance))),
    acc_pending_raw: accountInfo.pending!,
    acc_pending: parseFloat(raw_to_whole(BigInt(accountInfo.pending!))),
    rep_account: accountInfo.representative,
    voting_weight_raw: accountInfo.weight!,
    voting_weight: parseFloat(raw_to_whole(BigInt(accountInfo.weight!))),
    system_load: cpuLoadAverage.load1,
    used_mem: memoryInfo.used && Math.round(memoryInfo.used),
    total_mem: memoryInfo.total && Math.round(memoryInfo.total),
    node_name: process.env.NODE_NAME,
    node_uptime: parseFloat(telemetry.uptime),
    node_location: process.env.NODE_LOCATION,
    stats,
    telemetry_avg: telemetryAvg,
    block_sync: blockSync,
  });
}
