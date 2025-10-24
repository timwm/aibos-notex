"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { ChevronRight, Mode, Typography } from "~/components/icons";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

export const SettingsNav = () => {
  const pathname = usePathname();

  const items = [
    {
      name: "Color Theme",
      href: "/settings/color-theme",
      icon: <Mode />,
      active: pathname === "/settings/color-theme",
    },
    {
      name: "Font Theme",
      href: "/settings/font-theme",
      icon: <Typography />,
      active: pathname === "/settings/font-theme",
    },
  ];

  return (
    <div className="w-full lg:w-[258px]">
      <ul>
        {items.map((item) => (
          <li
            key={item.href}
            className={cn(
              "p-2",
              item.active && "bg-neutral-100 dark:bg-neutral-800",
            )}
          >
            <Link className="flex items-center gap-2" href={item.href}>
              {item.icon}
              <span className="text-preset-4 text-neutral-950 dark:text-white">
                {item.name}
              </span>
              {item.active && (
                <ChevronRight className="ml-auto dark:fill-white" />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <Separator className="my-2 bg-neutral-200" />
      {/* <SignOutButton /> */}
      {/* <button className="ml-2 flex w-full flex-row items-start justify-start space-x-2">
        <Logout height={28} width={28} />
        <span className="text-preset-4 self-center text-neutral-950 dark:text-white">
          Logout
        </span>
      </button> */}
      {/* </SignOutButton> */}
    </div>
  );
};
