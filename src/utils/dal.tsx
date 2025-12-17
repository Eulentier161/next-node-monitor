import { getAccountInfo, getBlockCount, getTelemetry, getTelemetryAvg, getVersion } from "@/utils/rpc";
import { getCpuLoadAverage, getMemoryInfo } from "@/utils/sys";
import { sToTime } from "@/utils/time";
import { raw_to_whole } from "@/utils/raw_to_whole";
import Link from "next/link";
import "server-only";

export async function nodeVersion() {
  const { node_vendor } = await getVersion();
  return node_vendor;
}

export async function databaseVersion() {
  const { store_vendor } = await getVersion();
  return store_vendor;
}

export async function uptime() {
  const { uptime } = await getTelemetry();
  return sToTime(parseInt(uptime));
}

export async function peers() {
  const { peer_count } = await getTelemetry();
  return peer_count;
}

export async function blockCount() {
  const { count } = await getBlockCount();
  return BigInt(count).toLocaleString();
}

export async function cementedCount() {
  const { cemented } = await getBlockCount();
  return BigInt(cemented || 0).toLocaleString();
}

export async function uncheckedCount() {
  const { unchecked } = await getBlockCount();
  return BigInt(unchecked).toLocaleString();
}

export async function syncStatus() {
  const { block_count: blockCount } = await getTelemetry();
  const { block_count: blockCountAvg } = await getTelemetryAvg();
  return `${Math.min(100, (parseInt(blockCount) / parseInt(blockCountAvg)) * 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}%`;
}

export async function balance() {
  const { balance } = await getAccountInfo();
  return parseFloat(raw_to_whole(BigInt(balance || 0))).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export async function pending() {
  const { pending } = await getAccountInfo();
  return parseFloat(raw_to_whole(BigInt(pending || 0))).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export async function representative() {
  const { representative } = await getAccountInfo();
  return (
    <Link
      href={`https://creeper.banano.cc/account/${representative}`}
      title={representative}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-banano-green dark:hover:text-banano-yellow text-right hover:underline"
    >
      {representative}
    </Link>
  );
}

export async function votingWeight() {
  const { weight } = await getAccountInfo();
  return parseFloat(raw_to_whole(BigInt(weight || 0))).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export async function host() {
  return process.env.NODE_NAME;
}

export async function location() {
  return process.env.NODE_LOCATION;
}

export async function load() {
  const { load1 } = await getCpuLoadAverage();
  return load1?.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export async function memoryUsed() {
  const { used, total } = await getMemoryInfo();
  return (
    `${used?.toLocaleString(undefined, { maximumFractionDigits: 0 })} / ` +
    `${total?.toLocaleString(undefined, { maximumFractionDigits: 0 })} MB`
  );
}
