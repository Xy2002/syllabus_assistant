import axios from 'axios'
import { UserState } from '@/store/modules/user/types'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data)
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info')
}
