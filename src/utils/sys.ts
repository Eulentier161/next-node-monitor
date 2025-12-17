import { type LoadAverage, OSUtils } from "node-os-utils";
import { cached } from "@/utils/cached";
import { cache } from "react";
import "server-only";

const osUtils = new OSUtils();

export const getCpuLoadAverage = cache(
  cached(async (): Promise<Partial<LoadAverage>> => {
    const cpuLoadAverage = await osUtils.cpu.loadAverage();
    if (cpuLoadAverage.success) {
      return cpuLoadAverage.data;
    }
    return {};
  })
);

export const getMemoryInfo = cache(
  cached(async () => {
    const memoryInfo = await osUtils.memory.info();
    if (memoryInfo.success) {
      return {
        used: memoryInfo.data.used.toMB(),
        total: memoryInfo.data.total.toMB(),
        free: memoryInfo.data.free.toMB(),
      };
    }
    return {};
  })
);
