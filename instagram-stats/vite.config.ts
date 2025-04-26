
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import {VitePluginRadar} from 'vite-plugin-radar'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const GOOGLE_TAG = `${env.VITE_GTAG_ID}`;

  return {
    plugins: [tailwindcss(),
      VitePluginRadar({
        analytics: {
          id: `G-${GOOGLE_TAG}`,
        }
      })],
  };
});