import { createSSRApp } from 'vue'
import App from './App.vue'

// uni-app 三端统一入口：必须导出 createApp 函数，由编译器在各端调用
export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
