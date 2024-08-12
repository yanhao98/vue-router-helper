import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  clearScreen: false,
  build: {
    sourcemap: true,
  },
  plugins: [Vue(), vueJsx(), Inspect()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@yanhao98/vue-router-helper': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
});
