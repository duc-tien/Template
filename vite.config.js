import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true
  },
  resolve:{
    alias:{
      "@src":path.join(__dirname,'./src')
    }
  },
  plugins: [react()],

})
