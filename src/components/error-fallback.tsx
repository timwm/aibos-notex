import type { PropsWithChildren } from "react";

export default function ErrorFallback({
  isError,
  children,
}: PropsWithChildren<{ isError: boolean }>) {
  if (isError)
    return (
      <div className="font-extrabold text-red-500">Error loading tags</div>
    );

  return <>{children}</>;
}
