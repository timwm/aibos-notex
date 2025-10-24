import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { HOME_URL, NEXT_PARAM_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const parseUrl = (url: string, nextURL = HOME_URL) => {
  const { searchParams, ...rest } = new URL(url);
  const next = searchParams.get(NEXT_PARAM_KEY) ?? nextURL;

  return { searchParams, next, ...rest };
};
