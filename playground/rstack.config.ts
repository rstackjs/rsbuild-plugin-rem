// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';
import { pluginRem } from '../src/index.ts';

define.app({
  plugins: [pluginRem()],
});
