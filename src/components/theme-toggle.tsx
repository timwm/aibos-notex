import { useTheme } from "next-themes";

import { Mode } from "~/components/icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (theme: string) => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={() => toggleTheme(theme || "light")}>
      <Mode />
      {/* {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"} */}
    </button>
  );
};

export default ThemeToggle;
