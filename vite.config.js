import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  watch: {
      usePolling: true, // Détecte les modifications sur le volume monté
      interval: 100
    },
})
