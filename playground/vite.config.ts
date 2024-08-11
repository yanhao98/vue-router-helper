import Vue from '@vitejs/plugin-vue';
import Markdown from 'unplugin-vue-markdown/vite';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  clearScreen: false,
  build: {
    sourcemap: true,
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    Markdown({}),
    // VueDevtools(),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@yanhao98/vue-router-helper': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
});
