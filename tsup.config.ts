import { defineConfig, type Options } from 'tsup';

export const commonOptions = {
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  external: ['vue-router', 'nprogress'],
  cjsInterop: true,
  splitting: true,
} satisfies Options;

export default defineConfig([
  {
    ...commonOptions,
    entry: ['./src/index.ts'],
  },
]);
