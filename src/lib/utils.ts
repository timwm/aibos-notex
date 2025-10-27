import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { NEXT_PARAM_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Parses a URL and extracts search parameters along with a 'next' parameter.
 * @param url - The URL to parse.
 * @param baseUrl - The base URL to resolve relative URLs.
 * @param nextURL - The default next URL if 'next' parameter is not found.
 * @returns An object containing search parameters, the next URL, and other URL components.
 */
export const parseUrl = (url: string, baseUrl?: string) => {
  const urlObj = new URL(url, baseUrl);
  const { searchParams } = urlObj;

  return {
    searchParams,
    next: searchParams.get(NEXT_PARAM_KEY) || undefined,
    pathname: urlObj.pathname,
    href: urlObj.href,
    origin: urlObj.origin,
    host: urlObj.host,
    hostname: urlObj.hostname,
    port: urlObj.port,
    protocol: urlObj.protocol,
    hash: urlObj.hash,
  };
};

export function getBaseUrl(path: string = "") {
  const baseUrl =
    typeof window === "undefined"
      ? `http://localhost:3000${path}` // ssr
      : window.location.href;

  return baseUrl;
}
