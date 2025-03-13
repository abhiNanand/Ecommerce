import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker';

// https://vitejs.dev/config/


export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [react(),
      Checker({
        typescript: true,
        overlay: true,
      })],
  });
}
