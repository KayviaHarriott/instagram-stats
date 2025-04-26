import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {VitePluginRadar} from 'vite-plugin-radar'

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePluginRadar({
      analytics: {
        id: 'G-1234567890',
      }
    })
  ],
})