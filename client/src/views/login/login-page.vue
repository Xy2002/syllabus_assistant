<template>
  <div class="fixed left-4 top-4 inline-flex logo items-center">
    <svg
      t="1646760816018"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="974"
      width="32"
      height="32"
    >
      <path
        d="M689.28 104.064l244.309333 360.021333A85.333333 85.333333 0 0 1 862.976 597.333333H374.357333a85.333333 85.333333 0 0 1-70.613333-133.248L548.053333 104.064a85.333333 85.333333 0 0 1 141.226667 0z"
        fill="#A5FFDB"
        p-id="975"
      ></path>
      <path
        d="M106.666667 405.333333m85.333333 0l341.333333 0q85.333333 0 85.333334 85.333334l0 341.333333q0 85.333333-85.333334 85.333333l-341.333333 0q-85.333333 0-85.333333-85.333333l0-341.333333q0-85.333333 85.333333-85.333334Z"
        fill="#757CFF"
        p-id="976"
      ></path>
      <path
        d="M533.333333 405.333333a85.333333 85.333333 0 0 1 85.333334 85.333334v106.666666H374.336a85.333333 85.333333 0 0 1-70.613333-133.248l39.893333-58.773333L533.333333 405.333333z"
        fill="#3842FF"
        p-id="977"
      ></path>
    </svg>
    <h1 class="text-xl ml-1 mr-1">Syllabus Assistant</h1>
  </div>
  <a-row>
    <a-col :span="9" class="logo-bg"> </a-col>
    <a-col :span="15" class="justify-center items-center flex min-h-screen">
      <LoginForm />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue'
</script>

<style lang="less" scoped>
  .logo {
    color: white;
    &-bg {
      height: 100vh;
      background: #1488cc; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #2b32b2,
        #1488cc
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to bottom,
        #2b32b2,
        #1488cc
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  .content-bg {
    height: 100vh;
  }
</style>
