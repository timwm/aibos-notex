"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";
import { Plus } from "~/components/icons";

type Props = {
  className?: string;
};

export const CreateNoteBtn = ({ className }: Props) => {
  const mobile = useIsMobile();

  return (
    <Button
      asChild
      className={cn(
        "text-preset-4 fixed right-4 bottom-20 h-16 w-16 rounded-full bg-blue-500 lg:static lg:mb-4 lg:h-auto lg:w-full lg:p-4",
        className,
      )}
    >
      <Link href="/notes/create">
        {mobile ? (
          <span>
            <Plus height={28} width={28} />
          </span>
        ) : (
          <span className="text-neutral-0 flex flex-row space-x-2">
            <Plus />
            <span>Create New Note</span>
          </span>
        )}
      </Link>
    </Button>
  );
};
