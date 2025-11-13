import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindscss from '@tailwindcss/vite'
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import { env } from 'process';

// ES compatibility for __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindscss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/exports'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@providers': path.resolve(__dirname, 'src/providers/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
    typecheck: {
      enabled: false,
    },
    env: {
      VITE_BACKEND_URL: env.VITE_BACKEND_URL || 'http://localhost:3000/api/'
    }
  }
})

