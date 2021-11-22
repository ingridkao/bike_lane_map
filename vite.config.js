import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

const baseURL = process.env.NODE_ENV === 'production'? '/bike_lane_map/': '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: baseURL,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})