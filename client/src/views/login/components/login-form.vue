<template>
  <div class="flex items-center justify-center flex-1"
    ><div class="content min-w-max form-wrapper">
      <div class="text-2xl font-medium leading-none mb-1 text-left login-form-title"
        >{{ t('login.form.title') }}
      </div>
      <div class="text-base leading-6 text-left login-form-subtitle"
        >{{ t('login.form.title') }}
      </div>
      <div class="h-8 text-red-600 leading-8 text-left">{{ errMessage }}</div>
      <a-form :model="userInfo" @submit="handleSubmit">
        <a-form-item
          field="username"
          :rules="usernameRule"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            v-model="userInfo.username"
            :placeholder="t('login.form.userName.placeholder')"
            @keyup.enter="handleSubmit"
            ><template #prefix><icon-user /></template
          ></a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :rules="passwordRule"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input-password
            v-model="userInfo.password"
            :placeholder="t('login.form.password.placeholder')"
            @keyup.enter="handleSubmit"
            ><template #prefix><icon-lock /></template
          ></a-input-password>
        </a-form-item>
        <a-space direction="vertical">
          <div class="flex justify-between">
            <a-checkbox checked="rememberPassword">
              {{ t('login.form.rememberPassword') }}
            </a-checkbox>
            <a-link>{{ t('login.form.forgetPassword') }}</a-link>
          </div>
          <a-button type="primary" html-type="submit" long :loading="loading">
            {{ t('login.form.login') }}
          </a-button>
          <a-button type="text" long disabled class="login-form-register-btn">
            {{ t('login.form.register') }}
          </a-button>
        </a-space>
      </a-form>
    </div></div
  >
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { FieldRule, ValidatedError } from '@arco-design/web-vue/es/form/interface'
  import { Message } from '@arco-design/web-vue'
  import { useI18n } from 'vue-i18n'
  import { LoginData } from '@/api/user'
  import useLoading from '@/hooks/loading'
  import { useUserStore } from '@/store'
  import '@arco-design/web-vue/es/message/style/css.js'
  import router from '@/router'
  const { t } = useI18n()
  const errMessage = ref('')
  const { loading, setLoading } = useLoading()
  const userStore = useUserStore()
  const userInfo = reactive({
    username: 'admintest1',
    password: 'admin'
  })

  const usernameRule: FieldRule[] = [
    {
      required: true,
      message: t('login.form.userName.errMsg')
    },
    {
      minLength: 9,
      maxLength: 10,
      message: t('login.form.userName.errMsg')
    }
  ]

  const passwordRule: FieldRule = {
    required: true,
    message: t('login.form.password.errMsg')
  }

  const handleSubmit = async ({
    values,
    errors
  }: {
    values: LoginData
    errors: Record<string, ValidatedError> | undefined
  }) => {
    console.log(values, errors)
    if (!errors) {
      setLoading(true)
      try {
        await userStore.login(values)
        router.push({
          name: 'home'
        })
        Message.success(t('login.form.login.success'))
      } catch (err) {
        console.log(err)
        errMessage.value = (err as Error).message
        console.log(errMessage)
      } finally {
        setLoading(false)
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-wrapper {
    width: 320px;
  }
  .login-form {
    &-title {
      color: var(--color-text-1);
    }
    &-subtitle {
      color: var(--color-text-3);
    }
  }
</style>
