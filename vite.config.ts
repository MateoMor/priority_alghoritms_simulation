import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  base: '/priority_alghoritms_simulation/', // Nombre de tu repositorio
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
