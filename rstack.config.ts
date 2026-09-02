// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';
import pkgJson from './package.json' with { type: 'json' };

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
});

define.fmt({
  singleQuote: true,
});

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint --fix', 'rs fmt'],
  '*.{json,md,mdx,css,scss,less,html,yml,yaml}': 'rs fmt',
});

define.lint(({ js, ts }) => [js.configs.recommended, ts.configs.recommended]);
