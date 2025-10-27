import { SimpleEditor } from "~/components/tiptap-templates/simple/simple-editor";

import { MainHeader } from "../components/main-header";

export default function Page() {
  return (
    <>
      <main className="relative w-fit overflow-hidden dark:bg-neutral-950 dark:text-neutral-200">
        {/* <SidebarProvider defaultOpen={false}>
        <AppSidebar />
          {/* <div className="w-full max-w-full overflow-hidden">
            <div className="w-full max-w-full overflow-x-auto overscroll-x-contain scroll-smooth">
              <ul className="flex flex-nowrap gap-3 px-3 py-2">
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 1</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 2</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 3</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 4</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 5</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 6</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 7</li>
                <li className="shrink-0 rounded bg-gray-200 px-4 py-2">Item 8</li>
              </ul>
            </div>
          </div> */}
        {/* {children} */}
        {/* <div className="overflow-hidden"> */}
        <SimpleEditor />
        {/* </div> */}
      </main>
      {/* </main>
        <Toaster />
      </SidebarProvider>
      <MobileNav /> */}
    </>
  );

  return (
    <div className="grid min-h-screen lg:grid-rows-[auto_1fr]">
      <MainHeader />
      <div className="grid h-full grid-cols-[auto_1fr]">
        {/* <SimpleEditor /> */}
        {/* <div className="flex flex-col">{children}</div> */}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <SimpleEditor />
      </div>
    </div>
  );
}
