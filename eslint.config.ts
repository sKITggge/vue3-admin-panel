import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.vite/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/*.min.js',
      '**/coverage/**',
    ],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  prettierConfig,
]);
