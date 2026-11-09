import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// vite 配置：uni 插件负责把 src 目录下的页面编译成 H5 / 小程序 / App 三端产物
export default defineConfig({
  plugins: [uni()],
  server: {
    host: '127.0.0.1',
    port: 5180,
    strictPort: true
  }
})
