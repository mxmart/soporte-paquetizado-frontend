import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "off",
      // Configuración para no-explicit-any
      "@typescript-eslint/no-explicit-any": "off",

      // Configuración para no-unused-vars
      "@typescript-eslint/no-unused-vars": [
        "warn", // Cambia a "error" si prefieres que falle en lugar de advertir
        {
          vars: "all", // Aplica a todas las variables
          args: "after-used", // Permite argumentos que se usan después de ser declarados
          ignoreRestSiblings: true, // Ignora variables sobrantes en destructuring
        },
      ],
    },
  },
];

export default eslintConfig;
