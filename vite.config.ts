import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const ENVIRONMENT = process.env.ENVIRONMENT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src/')
    }
  },
  define: {
    'APP_URL': ENVIRONMENT == 'vercel' ? process.env.VITE_VERCEL_URL : process.env.APP_URL
  }
})
