<template>
  <view class="page">
    <!-- ① 声明式 UI：模板只描述「界面长什么样」，数据变化由框架驱动视图更新 -->
    <view class="hero">
      <text class="hero-title">Hello World</text>
      <text class="hero-sub">UniApp · Vue3 · 声明式 UI</text>
    </view>

    <!-- ② 状态驱动视图：{{ }} 插值 + v-model 双向绑定 -->
    <view class="card">
      <view class="card-title">状态 → 视图</view>
      <input
        v-model="nickname"
        class="input"
        type="text"
        placeholder="输入你的名字"
        maxlength="12"
      />
      <text class="greeting">{{ greeting }}</text>
    </view>

    <!-- ③ 事件驱动状态：按钮只改数据，不碰 DOM -->
    <view class="card">
      <view class="card-title">事件 → 状态</view>
      <view class="counter-row">
        <button class="btn btn-ghost" @click="decrease">−</button>
        <text class="counter">{{ count }}</text>
        <button class="btn btn-primary" @click="increase">＋</button>
      </view>
      <!-- 条件渲染：count 决定提示文案是否出现 -->
      <text v-if="count >= 10" class="tip">已经点到 {{ count }} 次，声明式 UI 会自己刷新 ✨</text>
      <text v-else class="tip tip-muted">再点 {{ 10 - count }} 次解锁彩蛋</text>
    </view>

    <!-- ④ 列表渲染：v-for 由数组驱动 -->
    <view class="card">
      <view class="card-title">
        <text>待办清单</text>
        <text class="link" @click="addTodo">+ 添加</text>
      </view>
      <view
        v-for="(item, index) in todos"
        :key="item.id"
        class="todo"
        @click="toggleTodo(index)"
      >
        <text class="todo-dot" :class="{ done: item.done }">{{ item.done ? '✓' : '○' }}</text>
        <text class="todo-text" :class="{ done: item.done }">{{ item.text }}</text>
        <text class="todo-del" @click.stop="removeTodo(index)">删除</text>
      </view>
      <text v-if="todos.length === 0" class="tip tip-muted">清单空啦，点右上角「+ 添加」</text>
    </view>

    <text class="footer">状态 + 视图：一套思想，三种长相</text>
  </view>
</template>

<script setup>
// <script setup> 是 Vue3 组合式 API 的语法糖：声明即生效，无需 return
import { ref, computed } from 'vue'

// ①② 响应式状态
const nickname = ref('')
const count = ref(0)
const todos = ref([
  { id: 1, text: '安装 HBuilderX / Node 环境', done: true },
  { id: 2, text: '创建第一个 UniApp 工程', done: true },
  { id: 3, text: '写出 Hello World 页面', done: true },
  { id: 4, text: '运行到模拟器 / 真机并截图', done: false },
  { id: 5, text: '提交完整源码到 Gitee / GitHub', done: false }
])
let nextId = 6

// 计算属性：依赖 nickname 自动重算，本质仍是「状态的派生视图」
const greeting = computed(() =>
  nickname.value ? `你好，${nickname.value}！欢迎进入移动开发世界 👋` : '你好，同学！先在上面输入你的名字吧'
)

// ③ 事件处理：只修改状态
const increase = () => {
  count.value++
}
const decrease = () => {
  if (count.value > 0) count.value--
  else uni.showToast({ title: '不能小于 0 啦', icon: 'none' })
}

// ④ 列表操作：同样是改数组，视图自动同步
const toggleTodo = (index) => {
  todos.value[index].done = !todos.value[index].done
}
const removeTodo = (index) => {
  todos.value.splice(index, 1)
}
const addTodo = () => {
  todos.value.push({ id: nextId++, text: `新任务 ${nextId - 1}`, done: false })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 32rpx 32rpx 60rpx;
  box-sizing: border-box;
}

.hero {
  padding: 48rpx 36rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #4e6ef2 0%, #7d5cf6 100%);
  box-shadow: 0 12rpx 30rpx rgba(78, 110, 242, 0.28);
  display: flex;
  flex-direction: column;

  .hero-title {
    color: #ffffff;
    font-size: 66rpx;
    font-weight: 700;
    letter-spacing: 2rpx;
  }

  .hero-sub {
    margin-top: 12rpx;
    color: rgba(255, 255, 255, 0.86);
    font-size: 26rpx;
  }
}

.card {
  margin-top: 28rpx;
  padding: 32rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(31, 35, 41, 0.06);
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30rpx;
  font-weight: 600;
  color: #1f2329;
  margin-bottom: 20rpx;
}

.input {
  height: 84rpx;
  padding: 0 24rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 14rpx;
  font-size: 28rpx;
  background-color: #fafbfc;
}

.greeting {
  display: block;
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #4e6ef2;
  line-height: 1.6;
}

.counter-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.counter {
  min-width: 160rpx;
  text-align: center;
  font-size: 60rpx;
  font-weight: 700;
  color: #1f2329;
}

.btn {
  width: 96rpx;
  height: 72rpx;
  line-height: 72rpx;
  padding: 0;
  margin: 0;
  font-size: 36rpx;
  border-radius: 14rpx;
}

.btn-ghost {
  background-color: #ffffff;
  border: 2rpx solid #d9dde5;
  color: #1f2329;
}

.btn-primary {
  background-color: #4e6ef2;
  color: #ffffff;
  border: none;
}

.tip {
  display: block;
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #19be6b;
  text-align: center;
}

.tip-muted {
  color: #8a9099;
}

.todo {
  display: flex;
  align-items: center;
  padding: 22rpx 0;
  border-bottom: 2rpx solid #f2f3f5;
}

.todo:last-child {
  border-bottom: none;
}

.todo-dot {
  width: 44rpx;
  font-size: 30rpx;
  color: #c0c4cc;

  &.done {
    color: #19be6b;
  }
}

.todo-text {
  flex: 1;
  font-size: 27rpx;
  color: #1f2329;

  &.done {
    color: #a8adb5;
    text-decoration: line-through;
  }
}

.todo-del {
  font-size: 24rpx;
  color: #c0c4cc;
}

.link {
  font-size: 26rpx;
  font-weight: 400;
  color: #4e6ef2;
}

.footer {
  display: block;
  margin-top: 40rpx;
  text-align: center;
  font-size: 22rpx;
  color: #a8adb5;
}
</style>
