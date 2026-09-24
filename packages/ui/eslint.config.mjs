import { tailwindConfig } from "@workspace/eslint-config/tailwind";

export default tailwindConfig({
  entryPoint: "src/styles/globals.css",
  files: ["src/**/*.{ts,tsx}"],
});
