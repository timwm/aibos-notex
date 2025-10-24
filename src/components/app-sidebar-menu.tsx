"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { memo, useState } from "react";

import {
  // Sidebar,
  // SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import {
  type IconT,
  User,
  Archive,
  ChevronRight,
  Dashboard,
  Home,
  Notes,
  Search,
  Settings,
  Tag,
} from "~/components/icons";

// import { ChevronRight } from "lucide-react";

export const AppSidebarMenuT = () => {
  const pathname = usePathname();
  const items = [
    {
      name: "All Notes",
      href: "/",
      icon: (
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dark:fill-neutral-200"
            clipRule="evenodd"
            d="M4.496 8.025a.75.75 0 0 1 .75.75v8.675a2.314 2.314 0 0 0 2.314 2.314h8.88a2.314 2.314 0 0 0 2.313-2.314V8.775a.75.75 0 0 1 1.5 0v8.675a3.814 3.814 0 0 1-3.814 3.814H7.56a3.814 3.814 0 0 1-3.814-3.814V8.775a.75.75 0 0 1 .75-.75Z"
            fill="#0E121B"
            fillRule="evenodd"
          />
          <path
            className="dark:fill-neutral-200"
            clipRule="evenodd"
            d="M10.06 3.41a3.127 3.127 0 0 1 3.88 0l7.525 5.958a.75.75 0 1 1-.93 1.176l-7.526-5.957a1.628 1.628 0 0 0-2.018 0l-7.525 5.957a.75.75 0 1 1-.931-1.176L10.06 3.41Z"
            fill="#0E121B"
            fillRule="evenodd"
          />
          <path
            className="dark:fill-neutral-200"
            clipRule="evenodd"
            d="M17.668 4.193a.75.75 0 0 1 .75.75v2.354a.75.75 0 0 1-1.5 0V4.943a.75.75 0 0 1 .75-.75ZM11.974 13.688h.055c.377 0 .702 0 .97.02.283.022.565.071.838.203a2.25 2.25 0 0 1 1.05 1.05c.131.272.18.554.202.837.02.268.02.593.02.97v3.746a.75.75 0 0 1-1.5 0v-3.718c0-.412 0-.678-.015-.881-.016-.195-.041-.268-.059-.303a.75.75 0 0 0-.35-.35c-.035-.017-.108-.043-.302-.058a12.747 12.747 0 0 0-.881-.017c-.412 0-.679.001-.881.017-.195.015-.268.04-.303.058a.75.75 0 0 0-.35.35c-.017.035-.043.108-.058.303-.016.203-.016.469-.016.88v3.72a.75.75 0 0 1-1.5 0v-3.747c0-.377 0-.702.02-.97.022-.283.071-.565.203-.838a2.25 2.25 0 0 1 1.05-1.05c.273-.131.554-.18.837-.202.268-.02.593-.02.97-.02Z"
            fill="#0E121B"
            fillRule="evenodd"
          />
        </svg>
      ),
      active: pathname === "/" || /^\/notes\/\d+$/.test(pathname),
    },
    {
      name: "Archived Notes",
      href: "/archives",
      icon: (
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dark:stroke-neutral-200"
            d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"
            stroke="#0E121B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            className="dark:stroke-neutral-200"
            d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"
            stroke="#0E121B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
      active: pathname === "/archives" || /^\/archives\/\d+$/.test(pathname),
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => {
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={cn(
                item.active && "bg-neutral-100 dark:bg-neutral-800",
              )}
            >
              <Link href={item.href}>
                {item.icon}
                <span className="dark:text-neutral-200">{item.name}</span>
                {item.active && (
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
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

type NavT = {
  group: string;
  items: ({
    title: string;
    items?: NavT["items"];
  } & (
    | {
        url: string;
        icon?: IconT;
        component?: never;
      }
    | {
        component: React.ReactNode;
        url?: never;
        icon?: never;
      }
  ))[];
};

const navItems: NavT[] = [
  {
    group: "Application",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "All Notes", url: "/notes", icon: Dashboard },
      { title: "Search", url: "#", icon: Search },
      {
        title: "Archived",
        url: "#",
        icon: Archive,
        items: [
          { title: "Notes", url: "/archives", icon: Notes },
          { title: "Tags", url: "/archives?tags", icon: Tag },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [
          { title: "Profile", url: "/settings?profile" },
          { title: "Account", url: "/settings?account", icon: User },
        ],
      },
    ],
  },
];

export const AppSidebarMenu = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return navItems.map((groupItem, i) => (
    <SidebarGroup key={i} className="px-1">
      {groupItem.group && (
        <SidebarGroupLabel>{groupItem.group}</SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {groupItem.items.map((item, i) => (
            <SidebarItem
              key={i}
              isCollapsed={openItem === item.title}
              item={item}
              setCollapsedItem={setOpenItem}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};

type SidebarItemProps = {
  item: NavT["items"][number];
  isCollapsed: boolean;
  setCollapsedItem: (title: string | null) => void;
};

const SidebarItem = memo(function SidbarItem({
  item,
  isCollapsed,
  setCollapsedItem,
}: SidebarItemProps) {
  const { state, toggleSidebar } = useSidebar();

  if (item.items) {
    return (
      <Collapsible
        defaultOpen
        className="group/collapsible"
        open={isCollapsed}
        onOpenChange={(open) => {
          setCollapsedItem(open ? item.title : null);
          if (state === "collapsed") {
            toggleSidebar();
          }
        }}
      >
        <SidebarMenuItem className="px-1">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {item.component ? (
                item.component
              ) : (
                <>
                  <span className="-ml-1 h-6 w-6">
                    {item.icon && <item.icon />}
                  </span>
                  <span className="text-md ml-2">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                </>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    {subItem.component ? (
                      subItem.component
                    ) : (
                      <a href={subItem.url}>
                        {subItem.icon && <subItem.icon />}
                        <span>{subItem.title}</span>
                      </a>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem key={item.title} className="px-1">
      <SidebarMenuButton asChild>
        {item.component ? (
          item.component
        ) : (
          <Link className="flex w-full items-center" href={item.url!}>
            <span className="-ml-1 h-6 w-6">{item.icon && <item.icon />}</span>
            <span className="text-md ml-2">{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
