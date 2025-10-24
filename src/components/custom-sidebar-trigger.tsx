"use client";

import React from "react";

import { ArrowLeft } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSidebar } from "~/components/ui/sidebar";

// export default function CustomTrigger() {
//   const { toggleSidebar } = useSidebar();

//   return <button onClick={toggleSidebar}>Toggle Sidebar</button>;
// }

// eslint-disable-next-line react/display-name
const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar();

  return (
    <button
      ref={ref}
      className={cn(
        "transition-transform duration-200 ease-in-out",
        { "rotate-180": state === "collapsed" },
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <ArrowLeft height={32} width={32} />
    </button>
  );
});

export default SidebarTrigger;
