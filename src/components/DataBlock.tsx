import { PropsWithChildren, ReactNode, Suspense } from "react";

type Fn = () => Promise<ReactNode>;

export function DataBlock({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <h2>{title}</h2>
      <div className="dark:bg-banano-gray rounded border bg-gray-50 *:border-t *:first:border-t-0 dark:border-gray-500 *:dark:border-gray-500">
        {children}
      </div>
    </div>
  );
}

export function DataRow({ title, fn, mono }: { title: string; fn: Fn; mono?: boolean }) {
  return (
    <div className="grid grid-cols-2 px-2 py-1">
      <span>{title}</span>
      <Suspense
        fallback={
          <span className="flex animate-pulse items-center">
            <div className="h-2 w-full rounded-full bg-gray-500" />
          </span>
        }
      >
        <Component fn={fn} mono={mono} />
      </Suspense>
    </div>
  );
}

async function Component({ fn, mono }: { fn: Fn; mono?: boolean }) {
  const data = await fn().catch((e) => {
    console.error(e);
    return "unavailable";
  });
  return (
    <span className={"overflow-hidden text-right text-nowrap text-ellipsis" + (mono ? " font-mono" : "")}>{data}</span>
  );
}
