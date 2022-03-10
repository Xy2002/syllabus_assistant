import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store'
export default function usePermission() {
  const userStore = useUserStore()
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore.role)
      )
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findFirstPermissionRoute(_routes: any, role = 'user') {
      const cloneRouters = [..._routes]
      console.log(cloneRouters)
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        )
          return { name: firstElement.name }
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return null
    }
  }
}
