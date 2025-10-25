"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { getBaseUrl, parseUrl } from "~/lib/utils";

type NavT = {
  group: string;
  items: ({
    title: string;
    items?: NavT["items"];
    urlRegex?: RegExp;
  } & (
    | {
        url?: string;
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
      {
        title: "All Notes",
        url: "/notes",
        urlRegex: /notes(?:\/.+)?/,
        icon: Dashboard,
      },
      { title: "Search", icon: Search, urlRegex: /search/ },
      {
        title: "Archived",
        urlRegex: /archives(?:\/.+)?/,
        icon: Archive,
        items: [
          { title: "Notes", url: "/archives", icon: Notes },
          { title: "Tags", url: "/archives?tags", icon: Tag },
        ],
      },
      {
        title: "Settings",
        urlRegex: /settings(?:\/.+)?/,
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
  const activePathname = usePathname(); // .split("/").filter(Boolean).at(-1);

  return navItems.map((groupItem, i) => (
    <SidebarGroup key={i} className="px-1">
      {groupItem.group && (
        <SidebarGroupLabel>{groupItem.group}</SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {groupItem.items.map((item, i) => {
            const { pathname: itemPathname } = parseUrl(
              // Fallback to "#" so those without don't cause navigation
              item.url || "#",
              getBaseUrl(activePathname),
            );
            const isActive = item.urlRegex
              ? item.urlRegex.test(activePathname)
              : activePathname === itemPathname;

            return (
              <SidebarItem
                key={i}
                isActive={isActive}
                isCollapsed={openItem === item.title}
                item={item}
                itemPathname={itemPathname}
                setCollapsedItem={setOpenItem}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};

type SidebarItemProps = {
  item: NavT["items"][number];
  itemPathname: string;
  isActive: boolean;
  isCollapsed: boolean;
  setCollapsedItem: (title: string | null) => void;
};

const SidebarItem = memo(function SidbarItem({
  item,
  itemPathname,
  isActive,
  isCollapsed,
  setCollapsedItem,
}: SidebarItemProps) {
  const { state, toggleSidebar } = useSidebar();
  const itemUrl = isActive ? "#" : item.url || "#";

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
            <SidebarMenuButton
              className={isActive ? "border-2 border-blue-500" : ""}
            >
              {item.component ? (
                item.component
              ) : (
                <>
                  <span className="-ml-1.5 h-6 w-6">
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
              {item.items.map((subItem) => {
                const { pathname } = parseUrl(subItem.url || "#", getBaseUrl());

                return (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      {subItem.component ? (
                        subItem.component
                      ) : (
                        <Link
                          href={
                            pathname === itemPathname ? "#" : subItem.url || "#"
                          }
                        >
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                        </Link>
                      )}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem key={item.title} className="px-1">
      <SidebarMenuButton
        asChild
        className={isActive ? "border-2 border-blue-500" : ""}
      >
        {item.component ? (
          item.component
        ) : (
          <Link className="flex w-full items-center" href={itemUrl}>
            <span className="-ml-1.5 h-6 w-6">
              {item.icon && <item.icon />}
            </span>
            <span className="text-md ml-2">{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
