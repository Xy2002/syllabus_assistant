import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from './modules/login'
import appRoutes from './modules'
import pageLayout from '@/layout/page-layout.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'
import usePermission from '@/hooks/permission'
NProgress.configure({ showSpinner: false })
// 路由配置 和以前一样
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: pageLayout,
    children: appRoutes
  },
  login,
  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: 'notFound',
    component: () => import('@/views/not-found.vue')
  }
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
  history: createWebHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  NProgress.start()
  console.log(to, from)
  async function crossroads() {
    const Permission = usePermission()
    if (Permission.accessRouter(to)) await next()
    else {
      const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || {
        name: 'notFound'
      }
      await next(destination)
    }
    NProgress.done()
  }
  if (isLogin()) {
    if (userStore.role) {
      crossroads()
    } else {
      next({
        name: 'login'
      })
      NProgress.done()
    }
  } else {
    if (to.name === 'login') {
      next()
      NProgress.done()
      return
    }
    next({
      name: 'login'
    })
    NProgress.done()
  }
})

export default router
