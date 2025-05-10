// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules/*", "dist/*"]
},
  
{rules: {
  "no-unused-vars": "error",
  "no-unused-expressions": "error",
  "no-undef": "error",
  // "no-console": "warn"
},},
{ languageOptions: { globals: globals.browser }},
// {globals: {
//   "process": "readOnly"}
// }
];
