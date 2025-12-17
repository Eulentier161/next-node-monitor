import DataBlock from "@/components/DataBlock";
import NodeAddress from "@/components/NodeAddress";
import {
  balance,
  blockCount,
  cementedCount,
  databaseVersion,
  host,
  load,
  location,
  memoryUsed,
  nodeVersion,
  peers,
  pending,
  representative,
  syncStatus,
  uncheckedCount,
  uptime,
  votingWeight,
} from "@/utils/dal";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="container mx-auto px-2 pt-4">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        <div dangerouslySetInnerHTML={{ __html: process.env.HEADING_TEXT || "" }} className="whitespace-pre-wrap"></div>
        <Image
          src={`https://monkey.banano.cc/api/v1/monkey/${process.env.NODE_REPRESENTATIVE}`}
          loading="eager"
          alt="MonKey"
          unoptimized
          width={256}
          height={256}
        />
      </div>
      <h2>Node Account</h2>
      <NodeAddress representative={process.env.NODE_REPRESENTATIVE!} />
      <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
        <DataBlock
          title="Node"
          sections={[
            { title: "Version", fn: nodeVersion },
            { title: "Database", fn: databaseVersion },
            { title: "Node Uptime", fn: uptime },
            { title: "Peers", fn: peers, mono: true },
          ]}
        />
        <DataBlock
          title="Blocks"
          sections={[
            { title: "Current Blocks", fn: blockCount, mono: true },
            { title: "Cemented Blocks", fn: cementedCount, mono: true },
            { title: "Unchecked Blocks", fn: uncheckedCount, mono: true },
            { title: "Sync Status", fn: syncStatus, mono: true },
          ]}
        />
        <DataBlock
          title="Account"
          sections={[
            { title: "Balance", fn: balance, mono: true },
            { title: "Pending", fn: pending, mono: true },
            { title: "Representative", fn: representative, mono: true },
            { title: "Voting Weight", fn: votingWeight, mono: true },
          ]}
        />
        <DataBlock
          title="System"
          sections={[
            { title: "Host", fn: host },
            { title: "Location", fn: location },
            { title: "Load", fn: load, mono: true },
            { title: "Memory Used", fn: memoryUsed, mono: true },
          ]}
        />
      </div>
      <hr className="dark:border-banano-yellow/50 border-banano-green/50 my-4" />
    </div>
  );
}
