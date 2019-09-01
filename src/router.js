import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'
import Backup from '@/views/workspace/Backup.vue'
import Join from '@/views/Join.vue'
import NewWorkspace from '@/views/NewWorkspace.vue'
import NotFound from '@/views/errors/NotFound.vue'
import Settings from '@/views/workspace/Settings.vue'
import Sign from '@/views/Sign.vue'
import Stash from '@/views/workspace/Stash.vue'
import Stashes from '@/views/workspace/Stashes.vue'
import SettingsGeneral from '@/views/workspace/settings/General.vue'
import SettingsInvoice from '@/views/workspace/settings/Invoice.vue'
import SettingsInvoices from '@/views/workspace/settings/Invoices.vue'
import SettingsPaymentMethod from '@/views/workspace/settings/PaymentMethod.vue'
import SettingsPlan from '@/views/workspace/settings/Plan.vue'
import SettingsUsage from '@/views/workspace/settings/Usage.vue'
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
      path: '/workspaces/new',
      name: 'new_workspace',
      component: NewWorkspace,
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
          props: true,
          children: [
            {
              path: 'invoices',
              name: 'invoices',
              component: SettingsInvoices,
              props: true
            },
            {
              path: 'invoices/:id',
              name: 'invoice',
              component: SettingsInvoice,
              props: true
            },
            {
              path: 'usage',
              name: 'workspace_subscription_usage',
              component: SettingsUsage,
              props: true
            },
            {
              path: 'plan',
              name: 'change_plan',
              component: SettingsPlan,
              props: true
            },
            {
              path: 'payment_method',
              name: 'change_payment_method',
              component: SettingsPaymentMethod,
              props: true
            },
            {
              path: 'general',
              name: 'workspace_settings_general',
              component: SettingsGeneral,
              props: true
            }
          ]
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
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
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
