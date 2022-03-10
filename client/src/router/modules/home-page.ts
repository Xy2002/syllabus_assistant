export default {
  path: '/home',
  name: 'home',
  component: () => import('@/views/user-login.vue'),
  meta: {
    requiresAuth: true
  }
}
