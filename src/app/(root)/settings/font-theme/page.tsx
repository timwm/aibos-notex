import { FontThemeOptions } from "./font-theme-options";

export default function FontThemePage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-preset-3 text-neutral-950 dark:text-white">
          Font Theme
        </h1>
        <p className="text-preset-5 text-neutral-700 dark:text-neutral-300">
          Choose your font theme:
        </p>
      </div>
      <FontThemeOptions />
    </div>
  );
}
