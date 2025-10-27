import { useTheme } from "next-themes";

import { Mode, Mode2 } from "~/components/icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (theme: string) => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={() => toggleTheme(theme || "light")}>
      {theme === "light" ? <Mode /> : <Mode2 />}
      {/* {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"} */}
    </button>
  );
};

export default ThemeToggle;
