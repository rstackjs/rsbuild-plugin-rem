// Configuration guide: https://rstack.rs/config
import { readFileSync } from 'node:fs';
import { define } from 'rstack';

const pkgJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8'),
);

define.lib({
  lib: [
    { syntax: 'es2021', dts: true },
    { format: 'cjs', syntax: 'es2021' },
  ],
  source: {
    define: {
      VERSION: JSON.stringify(pkgJson.version),
    },
  },
});

define.test({
  env: {
    // Let Rsbuild choose the mode based on the command.
    NODE_ENV: undefined,
  },
  isolate: false,
});

define.fmt({
  ignorePatterns: ['dist'],
  singleQuote: true,
});

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint --fix', 'rs fmt'],
  '*.{json,md,mdx,css,scss,less,html,yml,yaml}': 'rs fmt',
});

define.lint(({ globals, js, ts }) => [
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ['playground/src/**/*', 'test/**/src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: globals.rstest,
    },
  },
]);
