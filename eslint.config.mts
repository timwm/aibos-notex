// import path from "node:path";
// import { fileURLToPath } from "node:url";

import { defineConfig, globalIgnores } from "eslint/config";
// import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";
// import _import from "eslint-plugin-import";
// import pluginJsxA11Y from "eslint-plugin-jsx-a11y";
// import pluginReact from "eslint-plugin-react";
// import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// Temporarily disable eslint-plugin-tailwindcss due to incompatibility with Tailwind CSS v4 beta APIs.
// import tailwind from "eslint-plugin-tailwindcss";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// });

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".now/*",
    "**/*.css",
    "**/.changeset",
    "**/dist",
    "esm/*",
    "public/*",
    "tests/*",
    "scripts/*",
    "**/*.config.js",
    // "**/tailwind.config.*.js",
    "**/.DS_Store",
    "**/node_modules", // **/node_modules/**
    "**/coverage",
    "**/.next",
    "**/build",
    "!**/.commitlintrc.cjs",
    "!**/.lintstagedrc.cjs",
    "!**/jest.config.js",
    "!**/plopfile.js",
    "!**/react-shim.js",
    "!**/tsup.config.ts",
  ]),
  {
    ignores: ["out/**", "next-env.d.ts"],

    extends: [
      // ...fixupConfigRules(
      //   // compat.extends(
      //   //   // "plugin:tailwindcss/recommended",
      //   // ),
      // ),
      js.configs.recommended, // "js/recommended"
    ],

    plugins: {
      // * next/typescript and next/core-web-vitals (above), recomend to comment these out
      // import: fixupPluginRules(_import),
      // "jsx-a11y": pluginJsxA11Y,

      js,
      "unused-imports": unusedImports,
      // tailwindcss: tailwind,
    },

    languageOptions: {
      ecmaVersion: "latest", // 12, // 2022
      sourceType: "module",
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, "off"]),
        ),
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      // tailwindcss: {
      //   // "callees": ["cn", "cva"],
      //   // "config": "tailwind.config.mjs",
      // },
    },

    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],

    rules: {
      "no-console": "warn",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "prettier/prettier": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],

      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],

          pathGroups: [
            {
              pattern: "~/**",
              group: "external",
              position: "after",
            },
          ],

          "newlines-between": "always",
        },
      ],

      "react/self-closing-comp": "warn",

      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],

      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      // "tailwindcss/no-custom-classname": "off",
      // "tailwindcss/classnames-order": "error",
    },
  },
  // ...tailwind.configs["flat/recommended"]

  // * next/typescript and next/core-web-vitals (above), recomend to comment these out
  tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  // pluginReactHooks.configs.flat.recommended,
  // pluginJsxA11Y.flatConfigs.recommended,
  pluginPrettierRecommended, // should come last
]);
