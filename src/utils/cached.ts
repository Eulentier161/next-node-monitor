import NodeCache from "node-cache";

type CachedFunction<T> = () => Promise<T>;

const CACHE_TIME_SECONDS = parseInt(process.env.CACHE_TIME || "10", 10);

const cache = new NodeCache({
  stdTTL: CACHE_TIME_SECONDS,
  checkperiod: CACHE_TIME_SECONDS * 2,
  useClones: false,
});

export function cached<T>(fn: CachedFunction<T>): CachedFunction<T> {
  const key = fn.toString();

  return async (): Promise<T> => {
    const cachedValue = cache.get<T>(key);

    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const value = await fn();
    cache.set(key, value);

    return value;
  };
}
