<template>
  <div id="nav_settings" class="flex-shrink-0 w-64">
    <div class="bg-white h-screen fixed flex flex-col top-0 w-64">
      <ul>
        <li class="mt-8 mb-2 mx-8 text-xs uppercase text-gray-600 font-medium">
          Organization
        </li>
        <li>
          <router-link
            :to="{ name: 'workspace_settings_general' }"
            class="hover:bg-indigo-100 active:bg-indigo-200 focus:bg-indigo-200 py-3 px-4 block mx-4 rounded"
            :class="
              $route.name === 'workspace_settings_general'
                ? 'bg-indigo-200 hover:bg-indigo-200'
                : ''
            "
            >General</router-link
          >
        </li>
        <li class="mt-8 mb-2 mx-8 text-xs uppercase text-gray-600 font-medium">
          Subscription
        </li>
        <li>
          <router-link
            :to="{ name: 'workspace_subscription_usage' }"
            class="hover:bg-indigo-100 active:bg-indigo-200 focus:bg-indigo-200 py-3 px-4 block mx-4 rounded"
            :class="
              [
                'workspace_subscription_usage',
                'change_payment_method',
                'change_plan'
              ].includes($route.name)
                ? 'bg-indigo-200 hover:bg-indigo-200'
                : ''
            "
            >Usage & Plan</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'invoices' }"
            class="hover:bg-indigo-100 active:bg-indigo-200 focus:bg-indigo-200 py-3 px-4 block mx-4 rounded"
            :class="
              ['invoices', 'invoice'].includes($route.name)
                ? 'bg-indigo-200 hover:bg-indigo-200'
                : ''
            "
            >Invoices</router-link
          >
        </li>
        <li class="mt-8 mb-2 mx-8 text-xs uppercase text-gray-600 font-medium">
          Account
        </li>
        <li>
          <router-link
            :to="{ name: 'workspaces' }"
            class="hover:bg-indigo-100 active:bg-indigo-200 focus:bg-indigo-200 py-3 px-4 mb-10 block mx-4 rounded"
            >Profile</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { authComputed } from '@/store/helpers.js'
export default {
  props: ['handle'],
  computed: {
    ...authComputed
  }
}
</script>
