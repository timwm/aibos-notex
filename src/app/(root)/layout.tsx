import { AppSidebar } from "~/components/app-sidebar";
import { MobileNav } from "~/components/mobile-nav";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <main className="border-3 border-red-500 relative w-full dark:bg-neutral-950 dark:text-neutral-200">
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
    <MobileNav />
    </>
  );
}
