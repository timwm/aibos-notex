"use client";
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"

// export const ThemeProvider = ({
//   children,
// }: Readonly<{ children: React.ReactNode }>) => {
//   useEffect(() => {
//     const theme = localStorage.getItem("theme") || "light";
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, []);

//   return <>{children}</>;
// };

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}