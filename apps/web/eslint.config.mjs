import { tailwindConfig } from "@workspace/eslint-config/tailwind";

export default tailwindConfig({
  entryPoint: "app/globals.css",
  files: ["{app,components,examples,hooks,lib}/**/*.{ts,tsx}"],
});
