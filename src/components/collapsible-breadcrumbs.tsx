"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";
import { ChevronRight, Ellipsis } from "~/components/icons";

interface Crumb {
  path: string;
  label: string;
}
type Props = {
  items?: Crumb[] | string; // can also be string (URL) or empty to use current URL
  className?: string;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  renderEllipsis?: (collapsed: Crumb[]) => React.ReactNode;
  Sep?: React.ComponentType;
};

export function CollapsibleBreadcrumbs({
  className = undefined,
  maxItems = 4,
  items,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  renderEllipsis,
  Sep = () => (
    <BreadcrumbSeparator>
      <ChevronRight className="h-4 w-4" />
    </BreadcrumbSeparator>
  ),
}: Props) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const classes = cn(
    "hidden sm:flex",
    {
      "max-w-[200px]": isMobile,
    },
    className,
  );

  if (items === undefined || typeof items === "string") {
    // Determine pathname safely in a client component using Next.js hook.
    // If usePathname() is not yet available (e.g. during hydration), fall back to '/'.
    let pathStr: string;

    if (items === undefined) {
      pathStr = pathname ?? "/";
    } else {
      pathStr = new URL(items).pathname;
    }

    // Generate breadcrumbs from URL path
    const pathSegments = pathStr.split("/").filter((segment) => segment !== "");

    items = [
      { label: "Home", path: "/" },
      ...pathSegments.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: `/${pathSegments.slice(0, index + 1).join("/")}`,
      })),
    ];
  }

  if (items.length <= maxItems)
    return (
      <Breadcrumb className={classes}>
        <BreadcrumbList>
          {items.map((it, i) => (
            <React.Fragment key={it.path}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={it.path}
                  // isActive={i === items.length - 1}
                >
                  {it.label}
                </BreadcrumbLink>
                {i < items.length - 1 && <Sep />}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );

  const first = items.slice(0, itemsBeforeCollapse);
  const last = items.slice(-itemsAfterCollapse);
  const collapsed = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);
  const ellipsis = renderEllipsis?.(collapsed) ?? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="More"
          className="h-6 w-6 p-0"
          size="icon"
          variant="ghost"
        >
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {collapsed.map((c) => (
          <DropdownMenuItem key={c.path} asChild>
            <a href={c.path}>{c.label}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Breadcrumb className={classes}>
      <BreadcrumbList>
        {first.map((it) => (
          <BreadcrumbItem key={it.path}>
            <BreadcrumbLink href={it.path}>{it.label}</BreadcrumbLink>
            <Sep />
          </BreadcrumbItem>
        ))}
        {ellipsis}
        <Sep />
        {last.map((it, i) => (
          <BreadcrumbItem key={it.path}>
            <BreadcrumbLink
              href={it.path}
              // isActive={i === last.length - 1}>
            >
              {it.label}
            </BreadcrumbLink>
            {i < last.length - 1 && <Sep />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default CollapsibleBreadcrumbs;
