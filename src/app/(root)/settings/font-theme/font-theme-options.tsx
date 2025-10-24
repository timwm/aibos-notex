"use client";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export const FontThemeOptions = () => {
  const [fontTheme, setFontTheme] = useState(
    localStorage.getItem("font-theme") || "sans-serif",
  );
  const onThemeChange = (theme: string) => {
    const fontProvider = document.querySelector(".font-provider");

    if (theme == "sans-serif") {
      fontProvider!.setAttribute("data-font", "sans-serif");
    } else if (theme == "noto-serif") {
      fontProvider!.setAttribute("data-font", "noto-serif");
    } else {
      fontProvider!.setAttribute("data-font", "source-code-pro");
    }

    localStorage.setItem("font-theme", theme);
  };

  return (
    <div className="flex w-full flex-col gap-6 lg:max-w-[528px]">
      <RadioGroup
        defaultValue={fontTheme}
        onValueChange={(value) => setFontTheme(value)}
      >
        <Label className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800">
          <div className="grid h-10 w-10 place-content-center rounded-xl border border-neutral-200 dark:border-neutral-700">
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
                d="M4.808 17.55H3L7.062 6.263H9.03l4.063 11.289h-1.808L8.093 8.312h-.088l-3.197 9.239Zm.303-4.42h5.865v1.433H5.111V13.13ZM16.822 17.738c-.537 0-1.022-.1-1.455-.297a2.452 2.452 0 0 1-1.031-.877c-.25-.382-.375-.85-.375-1.405 0-.478.092-.872.276-1.18.183-.309.431-.553.744-.733a3.89 3.89 0 0 1 1.047-.408c.386-.092.78-.162 1.18-.21l1.234-.143c.316-.04.546-.105.69-.193.143-.088.214-.231.214-.43v-.038c0-.482-.136-.855-.407-1.12-.269-.264-.67-.396-1.202-.396-.555 0-.992.123-1.312.37-.316.242-.535.512-.656.81l-1.549-.353c.184-.515.452-.93.805-1.246.356-.32.766-.551 1.229-.695a4.8 4.8 0 0 1 1.46-.22c.339 0 .697.04 1.076.121.382.077.738.22 1.069.43.334.21.608.509.821.899.213.385.32.887.32 1.504v5.623h-1.61v-1.158h-.066a2.346 2.346 0 0 1-.48.629 2.548 2.548 0 0 1-.82.512c-.335.136-.736.204-1.202.204Zm.358-1.323c.456 0 .845-.09 1.169-.27a1.89 1.89 0 0 0 .744-.705 1.83 1.83 0 0 0 .259-.943v-1.091c-.059.058-.173.114-.342.165-.165.048-.355.09-.568.127-.213.033-.42.064-.622.093-.203.026-.372.048-.508.067-.32.04-.611.108-.876.204-.261.095-.47.233-.629.413-.154.176-.231.412-.231.706 0 .407.15.716.452.926.301.205.685.308 1.152.308Z"
                fill="#0E121B"
              />
            </svg>
          </div>
          <div>
            <p className="text-preset-4 text-neutral-950 dark:text-white">
              Sans Serif
            </p>
            <p className="text-preset-6 text-neutral-700 dark:text-neutral-300">
              Clean and modern, easy to read.
            </p>
          </div>
          <RadioGroupItem id="sans-serif" value="sans-serif" />
        </Label>
        <Label className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800">
          <div className="grid h-10 w-10 place-content-center rounded-xl border border-neutral-200 dark:border-neutral-700">
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
                d="m8.501 6.317 3.858 9.928c.147.39.316.653.506.79.2.137.384.21.553.221v.317a11.037 11.037 0 0 0-.901-.032c-.337-.01-.68-.016-1.028-.016-.442 0-.853.006-1.233.016-.38 0-.685.01-.917.032v-.317c.538-.02.875-.11 1.012-.268.148-.169.116-.522-.095-1.06L7.411 8.245l.253-.284-2.625 6.86c-.19.475-.305.87-.347 1.187-.032.316-.006.563.079.743.094.179.253.305.474.379.221.074.495.116.822.126v.317a14.481 14.481 0 0 0-.964-.032 27.21 27.21 0 0 0-.902-.016c-.252 0-.48.006-.68.016-.189 0-.363.01-.521.032v-.317c.221-.052.443-.184.664-.395.221-.21.432-.569.632-1.075l3.668-9.47h.537Zm1.66 6.703v.316h-4.71l.157-.316h4.553ZM15.72 17.683c-.443 0-.822-.084-1.138-.253a1.679 1.679 0 0 1-.712-.695 2.11 2.11 0 0 1-.237-1.012c0-.464.106-.838.316-1.122.211-.296.48-.533.806-.712.338-.179.69-.327 1.06-.442.38-.127.732-.243 1.059-.348.337-.116.611-.248.822-.396.221-.147.332-.342.332-.584v-1.075c0-.38-.063-.68-.19-.902a1.006 1.006 0 0 0-.49-.49 1.689 1.689 0 0 0-.727-.142c-.242 0-.5.037-.775.11-.274.064-.49.196-.648.396.232.063.422.19.57.38a.99.99 0 0 1 .236.68c0 .294-.1.526-.3.695-.19.168-.432.253-.727.253-.327 0-.57-.1-.727-.3a1.18 1.18 0 0 1-.238-.728c0-.284.069-.516.206-.696.148-.179.337-.347.57-.505.252-.169.573-.311.963-.427.4-.116.844-.174 1.328-.174.454 0 .843.053 1.17.158.338.095.617.253.838.474.264.243.438.548.522.917.084.358.126.796.126 1.312v4.364c0 .263.032.453.095.569.074.105.19.158.348.158a.61.61 0 0 0 .3-.08 2.32 2.32 0 0 0 .364-.236l.158.268c-.221.18-.448.322-.68.427-.221.106-.506.158-.854.158-.337 0-.61-.052-.822-.158a1.052 1.052 0 0 1-.474-.458 1.73 1.73 0 0 1-.142-.743c-.274.442-.6.78-.98 1.011-.38.232-.822.348-1.328.348Zm.759-.759c.295 0 .569-.084.822-.252.263-.17.506-.422.727-.76v-3.145a1.502 1.502 0 0 1-.506.442c-.221.116-.458.238-.711.364a5.162 5.162 0 0 0-.728.443 1.956 1.956 0 0 0-.553.616c-.147.253-.221.575-.221.965 0 .41.105.737.316.98.21.231.495.347.854.347Z"
                fill="#0E121B"
              />
            </svg>
          </div>
          <div>
            <p className="text-preset-4 text-neutral-950 dark:text-white">
              Noto Serif
            </p>
            <p className="text-preset-6 text-neutral-700 dark:text-neutral-300">
              Classic and elegant for timeless feel.
            </p>
          </div>
          <RadioGroupItem id="noto-serif" value="noto-serif" />
        </Label>
        <Label className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800">
          <div className="grid h-10 w-10 place-content-center rounded-xl border border-neutral-200 dark:border-neutral-700">
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
                d="m3 17.365 3.605-10.93H8.54l3.604 10.93h-1.769l-1.769-5.957-.534-1.803-.5-1.835h-.067a56.224 56.224 0 0 1-.5 1.835c-.168.601-.34 1.202-.518 1.803l-1.786 5.957H3Zm2.02-3.137v-1.319h5.072v1.319H5.02ZM16.344 17.566c-.523 0-.996-.095-1.418-.284-.412-.2-.74-.473-.985-.818-.234-.356-.35-.773-.35-1.251 0-.913.445-1.608 1.335-2.086.9-.479 2.375-.796 4.422-.952a2.116 2.116 0 0 0-.234-.918 1.418 1.418 0 0 0-.65-.65c-.29-.167-.674-.25-1.152-.25-.334 0-.662.044-.985.133-.322.078-.634.189-.934.333-.3.145-.584.295-.851.451l-.618-1.118c.3-.178.646-.356 1.035-.534.39-.19.807-.34 1.252-.45a5.825 5.825 0 0 1 1.385-.168c.756 0 1.385.14 1.886.418.5.278.878.673 1.134 1.184.256.512.384 1.13.384 1.853v4.906h-1.352l-.133-1.051h-.05a7.91 7.91 0 0 1-1.469.884 3.999 3.999 0 0 1-1.652.367Zm.467-1.319a3.12 3.12 0 0 0 1.285-.284c.423-.189.84-.456 1.252-.8v-1.936c-1.068.078-1.908.2-2.52.367-.6.167-1.023.378-1.268.634a1.186 1.186 0 0 0-.367.868c0 .267.072.49.217.667.155.167.356.29.6.367.245.078.512.117.801.117Z"
                fill="#0E121B"
              />
            </svg>
          </div>
          <div>
            <p className="text-preset-4 text-neutral-950 dark:text-white">
              Monospace
            </p>
            <p className="text-preset-6 text-neutral-700 dark:text-neutral-300">
              Code-like, great for technical vibe.
            </p>
          </div>
          <RadioGroupItem id="monospace" value="monospace" />
        </Label>
      </RadioGroup>
      <Button
        className="self-end bg-blue-500"
        onClick={() => onThemeChange(fontTheme)}
      >
        Apply Changes
      </Button>
    </div>
  );
};
