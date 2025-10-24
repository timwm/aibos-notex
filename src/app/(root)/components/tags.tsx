"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "~/lib/utils";

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
            <li key={tag} className={cn("p-3", active && "bg-neutral-100")}>
              <Link className="flex items-center gap-2" href={href}>
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="dark:stroke-white"
                    clipRule="evenodd"
                    d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
                    stroke="#0E121B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                  <path
                    className="dark:stroke-white"
                    clipRule="evenodd"
                    d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
                    stroke="#0E121B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
                <span className="text-preset-4 text-neutral-700 dark:text-neutral-200">
                  {tag}
                </span>
                {activeTag && (
                  <svg
                    className="ml-auto dark:fill-white"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="dark:fill-white"
                      clipRule="evenodd"
                      d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
                      fill="#000"
                      fillRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
