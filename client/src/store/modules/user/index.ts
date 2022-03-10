import { defineStore } from 'pinia'
import { login as userLogin, LoginData } from '@/api/user'
// import { clearToken } from '@/utils/auth'
import { UserState } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    role: '',
    account: ''
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    }
  },

  actions: {
    resetInfo() {
      this.$reset()
    },
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    // Get user's information
    // async info() {
    //   const res = await getUserInfo()
    //   this.setInfo(res.data)
    // },
    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        this.setInfo(res.data)
      } catch (err) {
        this.$reset()
        throw err
      }
    }
  },

  persist: true
})
