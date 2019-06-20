import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'
import Backup from '@/views/workspace/Backup.vue'
import Join from '@/views/Join.vue'
import NotFound from '@/views/errors/NotFound.vue'
import Settings from '@/views/workspace/Settings.vue'
import Sign from '@/views/Sign.vue'
import Stash from '@/views/workspace/Stash.vue'
import Stashes from '@/views/workspace/Stashes.vue'
import Workspace from '@/views/Workspace.vue'
import Workspaces from '@/views/Workspaces.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
    },
    {
      path: '/workspaces',
      name: 'workspaces',
      component: Workspaces,
      meta: { requiresAuth: true }
    },
    {
      path: '/:handle',
      component: Workspace,
      props: true,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'backups/:id',
          name: 'backup',
          component: Backup,
          props: true
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          props: true
        },
        {
          path: ':id',
          name: 'stash',
          component: Stash,
          props: true
        },
        {
          path: '',
          component: Stashes,
          name: 'workspace',
          props: true
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user.user

  if (loggedIn) {
    Vue.axios.defaults.headers.common['Authorization'] = store.state.user.token

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
