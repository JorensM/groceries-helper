import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

//const ENVIRONMENT = process.env.ENVIRONMENT;



// https://vitejs.dev/config/
export default defineConfig(( { mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '');

  console.log(env.ENVIRONMENT);
  console.log(env.VITE_VERCEL_URL);
  console.log(env.APP_URL);
  
  return ({
    plugins: [react()],
    resolve: {
      alias: {
        '#': path.resolve(__dirname, './src/')
      }
    },
    define: {
      'APP_URL': env.ENVIRONMENT == 'vercel' ? `'${env.VITE_VERCEL_URL}'` : `'${env.APP_URL}'`
    }
  })
})
