import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'
import Backup from '@/views/Backup.vue'
import Join from '@/views/Join.vue'
import Settings from '@/views/Settings.vue'
import Sign from '@/views/Sign.vue'
import Workspace from '@/views/Workspace.vue'
import Workspaces from '@/views/Workspaces.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/workspaces',
      name: 'workspaces',
      component: Workspaces,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!store.state.workspace.alreadyFetched) {
          store.dispatch('fetchWorkspaces')
        }
        next()
      }
    },
    {
      path: '/:handle',
      name: 'workspace',
      component: Workspace,
      props: true,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.getStashesByWorkspaceHandle(to.params.handle).length
        ) {
          store.dispatch('fetchStashesByWorkspaceHandle', to.params.handle)
        }
        next()
      }
    },
    {
      path: '/:handle/backups/:id',
      name: 'backup',
      component: Backup,
      props: true,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchBackup', to.params.id).then(() => {
          store.dispatch(
            'fetchAgent',
            store.getters.getBackupById(to.params.id).agent
          )
        })
        next()
      }
    },
    {
      path: '/:handle/:id',
      name: 'stash',
      props: true,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        let path = {
          workspace: to.params.handle,
          stash: to.params.id
        }
        store.dispatch('fetchBackupsByPath', path).then(() => {
          router.push({
            name: 'backup',
            params: {
              handle: to.params.handle,
              id: store.getters.getBackupsByPath(path)[0].id
            }
          })
          next()
        })
      }
    },
    {
      path: '/:handle/settings',
      name: 'settings',
      component: Settings,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      meta: { publicOnly: true }
    },
    {
      path: '/',
      name: 'sign',
      component: Sign,
      alias: '/login',
      meta: { publicOnly: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user.user

  if (loggedIn) {
    Vue.axios.defaults.headers.common['Authorization'] = store.state.user.token

    // Fetches the current workspace into the state when not present.
    if (
      to.params.handle &&
      !store.getters.getWorkspaceByHandle(to.params.handle)
    ) {
      store.dispatch('fetchWorkspace', to.params.handle).then(() => {
        next()
      })
    }

    // Redirects public only routes back to dashboard
    if (to.matched.some(record => record.meta.publicOnly)) {
      next('/workspaces')
    }
  }

  // Redirects protected routes back to sign in page.
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }

  next()
})

export default router
