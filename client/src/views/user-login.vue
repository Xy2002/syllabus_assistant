<template>
  <h1 class="text-2xl font-bold leading-none mt-24" style="color: #2db5cf">课程信息系统</h1>
  <div class="text-center mx-auto my-8 flex justify-center items-center flex-col">
    <input type="text" class="uni-input text-lg pl-6" placeholder="账号" />
    <input type="password" class="uni-input mt-5 pl-6 text-lg" placeholder="密码" />
    <button class="mt-5 loginBtn">登录</button>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
  .uni-input {
    width: 486px;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 5px 6px rgba(81, 81, 81, 0.16);
    opacity: 0.7;
    border-radius: 20px;
  }
  ::placeholder {
    color: #989898;
    font-weight: 400;
    font-size: 18px;
  }
  .loginBtn {
    width: 486px;
    height: 60px;
    background: #2db5cf;
    box-shadow: 0px 5px 6px rgba(24, 14, 66, 0.2);
    opacity: 1;
    border-radius: 20px;
    font-size: 28px;
    font-weight: 400;
    color: #ffffff;
    opacity: 1;
  }
</style>
