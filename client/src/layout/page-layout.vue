<template>
  <div class="navBarLayout">
    <NavBar />
  </div>
  <router-view />
</template>

<script setup lang="ts">
  import NavBar from '@/components/navbar/nav-bar.vue'
</script>

<style scoped lang="less">
  .navBarLayout {
    height: 60px;
  }
</style>
