"use client";

import Link from "next/link";

import CollapsibleBreadcrumbs from "~/components/collapsible-breadcrumbs";
import { Settings } from "~/components/icons";
import ThemeToggle from "~/components/theme-toggle";
import SignoutButton from "~/components/signout-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "~/components/ui/tooltip";

import { SearchNotes } from "./search-notes";

type Props = {
  isArchive?: boolean;
  isSettings?: boolean;
};

export const MainHeader = ({ isArchive, isSettings }: Props) => {
  return (
    <header className="hidden items-center justify-between border-b border-neutral-200 px-8 py-[18.5px] lg:flex dark:border-neutral-700">
      <CollapsibleBreadcrumbs />
      <h1 className="text-preset-1 dark:text-neutral-200">
        {isArchive ? "Archived Notes" : isSettings ? "Settings" : "All Notes"}
      </h1>
      <div className="flex items-center gap-4">
        <SearchNotes />
        <ThemeToggle />
        <Link href="/settings">
          <Settings className="h-6 w-6 dark:fill-neutral-200" />
        </Link>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <SignoutButton
                  className="h-7 border border-red-500 text-red-500"
                  showText={false}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold text-red-500">Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};
