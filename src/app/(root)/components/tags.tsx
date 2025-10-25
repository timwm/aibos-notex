"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "~/lib/utils";
import { Tag, ChevronRight } from "~/components/icons";

type Props = {
  tags: string[];
};

export const Tags = ({ tags }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");
  const isArchive = pathname === "/archives";

  tags = tags.map((tag) => tag.toLowerCase());
  tags = Array.from(new Set(tags));

  return (
    <div className="text-preset-4">
      <p className="mb-2">Tags</p>
      <ul className="space-y-1">
        {tags.map((tag) => {
          const active = tag === activeTag;
          const href = isArchive ? `/archives?tag=${tag}` : `/?tag=${tag}`;

          return (
            <li
              key={tag}
              className={cn(
                "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground rounded-xl p-2",
                active &&
                  "border-sidebar-accent text-sidebar-accent-foreground border",
              )}
            >
              <Link className="flex items-center gap-2" href={href}>
                <Tag height={16} />
                <span className="text-preset-4 text-neutral-700 dark:text-neutral-200">
                  {tag}
                </span>
                {activeTag && (
                  <ChevronRight
                    className="ml-auto dark:fill-white"
                    height={16}
                    width={16}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
