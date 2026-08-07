import tseslint from "typescript-eslint";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import oxlint from "eslint-plugin-oxlint";

export default tseslint.config(
  {
    extends: [oxlint.configs["flat/recommended"]],
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      ...betterTailwindcss.configs.stylistic.rules,
      ...betterTailwindcss.configs.correctness.rules,
      "better-tailwindcss/enforce-canonical-classes": [
        "warn",
        { collapse: true, logical: false },
      ],
      "better-tailwindcss/enforce-shorthand-classes": "off",
      "better-tailwindcss/enforce-consistent-important-position": "off",
      "better-tailwindcss/enforce-consistent-variable-syntax": "off",
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/enforce-consistent-class-order": "off",
      "better-tailwindcss/no-unknown-classes": "off",
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles/globals.css",
        cwd: ".",
        detectComponentClasses: true,
        rootFontSize: 16,
      },
    },
  },
);
