import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { getAllTags } from "~/actions/notes";
import { getUserSession } from "~/actions/auth";
import ErrorFallback from "~/components/error-fallback";
import { Logo } from "~/components/icons";
import { HOME_URL } from "~/lib/constants";

import { Tags } from "../app/(root)/components/tags";

import { AppSidebarMenu } from "./app-sidebar-menu";
import CustomTrigger from "./custom-sidebar-trigger";

export async function AppSidebar() {
  const { error, user } = await getUserSession();
  const tags = error ? [] : await getAllTags(user);

  const uniqueTags = Array.from(new Set(tags.map((tag) => tag.name)));

  return (
    <Sidebar
      className="bg-neutral-0 min-w-12 overflow-clip dark:bg-neutral-950 dark:text-neutral-200"
      collapsible="icon"
    >
      <SidebarHeader className="bg-neutral-0 px-4 py-6 dark:bg-neutral-950 dark:text-neutral-200">
        <div className="mb-3 flex justify-start gap-4">
          <CustomTrigger className="-ml-2" />
          <Link href={HOME_URL}>
            <Logo />
          </Link>
          {/* <SidebarTrigger className="-ml-1" /> */}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-0 dark:bg-neutral-950 dark:text-neutral-200">
        <AppSidebarMenu />
        <div className="m-2 mt-4 border-t border-neutral-200 py-4">
          <ErrorFallback isError={!!error}>
            <Tags tags={uniqueTags} />
          </ErrorFallback>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
