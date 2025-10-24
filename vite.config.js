import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindscss from '@tailwindcss/vite'
import path from 'path';
import svgr from 'vite-plugin-svgr';

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
  }
})

