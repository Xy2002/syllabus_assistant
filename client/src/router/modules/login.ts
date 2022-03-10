export default {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login-page.vue'),
  meta: {
    requiresAuth: false
  }
}
