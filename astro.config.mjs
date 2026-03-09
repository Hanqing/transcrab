import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hanqing.github.io',
  base: '/transcrab/',
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});