import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Actions, derive the base path from the repo name so the site
// works at https://<user>.github.io/<repo>/. Locally it stays at '/'.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];

// https://vitejs.dev/config/
export default defineConfig({
  base: repo ? `/${repo}/` : '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
