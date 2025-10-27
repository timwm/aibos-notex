"use client";
import { useEffect } from "react";

export const FontProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  useEffect(() => {
    const theme = localStorage.getItem("font-theme") || "sans-serif";

    const fontProvider = document.querySelector(".font-provider");

    if (theme == "sans-serif") {
      fontProvider!.setAttribute("data-font", "sans-serif");
    } else if (theme == "noto-serif") {
      fontProvider!.setAttribute("data-font", "noto-serif");
    } else if (theme == "poppins") {
      fontProvider!.setAttribute("data-font", "poppins");
    } else if (theme == "nunito") {
      fontProvider!.setAttribute("data-font", "nunito");
    } else {
      fontProvider!.setAttribute("data-font", "source-code-pro");
    }

    localStorage.setItem("font-theme", theme);
  }, []);

  return <>{children}</>;
};
