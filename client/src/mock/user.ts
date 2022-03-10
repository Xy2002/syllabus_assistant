import Mock from 'mockjs'
import setupMock, { successResponseWrap, failResponseWrap } from '@/utils/mock-setup'
import { MockParams } from '@/types/mock'

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) return failResponseWrap(null, '请输入用户名', 401)
      if (!password) return failResponseWrap(null, '请输入密码', 401)
      if (username === 'admintest1' && password === 'admin') {
        return successResponseWrap({
          token: '12345',
          role: 'admin',
          account: 'admin'
        })
      }
      if (username === 'user' && password === 'user') {
        return successResponseWrap({
          token: '12345',
          role: 'user',
          account: 'user'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 401)
    })
  }
})
