"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";

type Props = {
  className?: string;
};

export const CreateNoteBtn = ({ className }: Props) => {
  const mobile = useIsMobile();

  return (
    <Button
      asChild
      className={cn(
        "text-preset-4 fixed right-4 bottom-[80px] h-16 w-16 rounded-full bg-blue-500 lg:static lg:mb-4 lg:h-auto lg:w-full",
        className,
      )}
    >
      <Link href="/notes/create">
        {mobile ? (
          <div>
            <Image
              alt=""
              height={24}
              src={"/images/icon-plus.svg"}
              width={24}
            />
          </div>
        ) : (
          <span className="text-neutral-0">+ Create New Note</span>
        )}
      </Link>
    </Button>
  );
};
