import { MainHeader } from "../components/main-header";
import { SettingsNav } from "./settings-nav";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen lg:grid lg:grid-rows-[auto_1fr]">
      <MainHeader isSettings />
      <div className="grid h-full lg:grid-cols-[auto_1fr]">
        <div className="w-full border-neutral-200 px-4 py-6 md:px-8 lg:block lg:border-r lg:px-4 lg:py-5 dark:border-neutral-700">
          <p className="text-preset-1 mb-4 block text-neutral-950 lg:hidden dark:text-white">
            Settings
          </p>
          <SettingsNav />
        </div>

        <div className="flex w-full px-4 py-6 lg:flex-col lg:p-8 dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
}
