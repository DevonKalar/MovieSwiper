import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindscss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindscss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@providers': path.resolve(__dirname, 'src/providers/'),
    }
  }
})

