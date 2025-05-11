import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { 
      js,
      react: pluginReact 
    }, 
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect" 
      }
    },
    rules: {
      
      "react/prop-types": "error", 
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      
    }
  },
  pluginReact.configs.flat.recommended,
]);