import { DataBlock, DataRow } from "@/components/DataBlock";
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
        <DataBlock title="Node">
          <DataRow title="Version" fn={nodeVersion} />
          <DataRow title="Database" fn={databaseVersion} />
          <DataRow title="Node Uptime" fn={uptime} />
          <DataRow title="Peers" fn={peers} mono />
        </DataBlock>
        <DataBlock title="Blocks">
          <DataRow title="Current Blocks" fn={blockCount} mono />
          <DataRow title="Cemented Blocks" fn={cementedCount} mono />
          <DataRow title="Unchecked Blocks" fn={uncheckedCount} mono />
          <DataRow title="Sync Status" fn={syncStatus} mono />
        </DataBlock>
        <DataBlock title="Account">
          <DataRow title="Balance" fn={balance} mono />
          <DataRow title="Pending" fn={pending} mono />
          <DataRow title="Representative" fn={representative} mono />
          <DataRow title="Voting Weight" fn={votingWeight} mono />
        </DataBlock>
        <DataBlock title="System">
          <DataRow title="Host" fn={host} />
          <DataRow title="Location" fn={location} />
          <DataRow title="Load" fn={load} mono />
          <DataRow title="Memory Used" fn={memoryUsed} mono />
        </DataBlock>
      </div>
      <hr className="dark:border-banano-yellow/50 border-banano-green/50 my-4" />
    </div>
  );
}
