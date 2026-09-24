import tseslint from "typescript-eslint";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import oxlint from "eslint-plugin-oxlint";

/**
 * @param {object} options
 * @param {string} options.entryPoint Path to the stylesheet that imports Tailwind.
 * @param {string[]} options.files Glob patterns to lint.
 */
export function tailwindConfig({ entryPoint, files }) {
  return tseslint.config(
    { extends: [oxlint.configs["flat/recommended"]] },
    {
      files,
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: { ecmaFeatures: { jsx: true } },
      },
      plugins: { "better-tailwindcss": betterTailwindcss },
      rules: {
        ...betterTailwindcss.configs.stylistic.rules,
        ...betterTailwindcss.configs.correctness.rules,
        "better-tailwindcss/enforce-canonical-classes": [
          "error",
          { collapse: true, logical: false },
        ],
        "better-tailwindcss/enforce-shorthand-classes": "off",
        "better-tailwindcss/enforce-consistent-important-position": "off",
        "better-tailwindcss/enforce-consistent-variable-syntax": "off",
        "better-tailwindcss/enforce-consistent-line-wrapping": "off",
        "better-tailwindcss/enforce-consistent-class-order": "off",
        "better-tailwindcss/no-unknown-classes": [
          "error",
          { ignore: ["^cn-", "^toaster$", "^not-prose$"] },
        ],
      },
      settings: {
        "better-tailwindcss": {
          entryPoint,
          cwd: ".",
          detectComponentClasses: true,
        },
      },
    },
  );
}
