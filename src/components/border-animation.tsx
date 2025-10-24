import type { PropsWithChildren } from "react";
import "./border-animation.css";

export default function BorderAnimation({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`border-gradient relative mx-auto w-72 rounded-lg bg-[#1c1f2b] p-8 text-center text-[#a2a5b3] ${className}`}
    >
      {children}
      {/* <span className="absolute inset-0 -z-10 rounded-lg border-gradient p-2" />
      <span className="absolute inset-0 -z-20 rounded-lg border-gradient blur-2xl opacity-50" /> */}
    </div>
  );
}
