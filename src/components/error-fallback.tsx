import type { PropsWithChildren } from "react";

export default function ErrorFallback({
  isError,
  children,
  fallback = null,
}: PropsWithChildren<{ isError: boolean; fallback?: React.ReactNode }>) {
  console.log("ErrorFallback::", { isError });
  if (isError)
    return (
      <div className="flex items-center justify-center font-extrabold text-red-500">
        {fallback || "Something went wrong."}
      </div>
    );

  return <>{children}</>;
}
