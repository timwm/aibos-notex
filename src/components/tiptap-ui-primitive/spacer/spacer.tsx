"use client";

import * as React from "react";

export type SpacerOrientation = "horizontal" | "vertical";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SpacerOrientation;
  size?: string | number;
}

export function Spacer({
  orientation = "horizontal",
  size,
  style = {},
  ...props
}: SpacerProps) {
  const computedStyle = {
    ...style,
    // O11 old ...(orientation === "horizontal" && !size && { flex: 1 }),
    ...(orientation === "horizontal" &&
      !size && { flex: "1 1 0", minWidth: 0 }),
    ...(size && {
      width: orientation === "vertical" ? "1px" : size,
      height: orientation === "horizontal" ? "1px" : size,
    }),
  };

  return <div {...props} style={computedStyle} />;
}
