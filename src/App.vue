<script>
export default {
  onLaunch() {
    console.log('[App] onLaunch —— 应用启动，三端生命周期统一在这里处理')
  },
  onShow() {
    console.log('[App] onShow —— 应用进入前台')
  },
  onHide() {
    console.log('[App] onHide —— 应用进入后台')
  }
}
</script>

<style>
/* 全局样式：三端通用，单位 rpx 会自动按屏幕宽度换算 */
page {
  background-color: #f5f6fa;
}
</style>
