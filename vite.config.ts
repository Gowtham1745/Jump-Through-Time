import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this project from /Jump-Through-Time/.
export default defineConfig({
  base: '/Jump-Through-Time/',
  plugins: [react()],
})
