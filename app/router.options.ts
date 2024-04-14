import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Do not scroll when only the query parameters change.
    if (from.path === to.path) {
      return
    }

    // Wait for the page transition before scrolling.
    return new Promise((resolve) =>
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ top: 0 })
        }
      }, 300)
    )
  },
}
