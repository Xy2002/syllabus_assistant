<script setup lang="ts">
  import { useUserStore } from '@/store'
  import router from './router'
  //暗黑模式 Dark Mode
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
  if (darkThemeMq.matches) {
    document.body.setAttribute('arco-theme', 'dark')
  }
  darkThemeMq.onchange = (e) => {
    if (e.matches) {
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      document.body.removeAttribute('arco-theme')
    }
  }
  //检测是否登陆
  const userStore = useUserStore()
  if (!userStore.token) {
    router.push({ name: 'login' })
  }
</script>

<template>
  <router-view></router-view>
</template>

<style>
  #app {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      '微软雅黑', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  body {
    background-color: var(--color-bg-1);
    color: var(--color-text-1);
  }
</style>
