import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config} */
export default {
  files: ["**/*.{js,mjs,cjs,ts,tsx}"], // Added .tsx for React TypeScript
  languageOptions: {
    globals: globals.node,
    parser: parser,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    js.configs.recommended, // Standard JavaScript rules
    tseslint.configs.recommended, // TypeScript recommended rules
  ],
  rules: {
    // Add custom ESLint rules here
  },
};
