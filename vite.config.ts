import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // CI supplies the path from GitHub Pages; default matches the requested repo.
  base: process.env.VITE_BASE_PATH || '/triple-m-neuromuscular-atlas/',
  build: { sourcemap: false },
});
