<template>
  <div id="nav" class="flex-shrink-0 w-24">
    <div
      class="bg-indigo-600 h-screen fixed text-center flex flex-col items-center top-0 w-24"
    >
      <ul>
        <li class="m-5 mb-10">
          <router-link :to="{ name: 'workspaces' }">
            <svg class="fill-current text-white inline-block h-10 w-10">
              <use xlink:href="@/assets/images/icon-sprite.svg#brand" />
            </svg>
          </router-link>
        </li>
        <li class="mb-8">
          <router-link
            :to="{
              name: 'workspace',
              params: { handle: this.handle }
            }"
            class="hover:bg-indigo-500 focus:bg-indigo-400 p-4 pb-5 rounded"
            :class="
              ['workspace', 'backup', 'stash'].includes($route.name)
                ? 'bg-indigo-400 hover:bg-indigo-400'
                : ''
            "
          >
            <svg
              class="fill-current text-white inline-block"
              width="32"
              height="32"
            >
              <use xlink:href="@/assets/images/icon-sprite.svg#stashes" />
            </svg>
          </router-link>
        </li>
        <li class="mb-8">
          <router-link
            :to="{
              name: 'settings',
              params: { handle: this.handle }
            }"
            class="hover:bg-indigo-500 focus:bg-indigo-400 p-4 pb-5 rounded"
            :class="
              $route.name === 'settings'
                ? 'bg-indigo-400 hover:bg-indigo-400'
                : ''
            "
          >
            <svg
              class="fill-current text-white inline-block"
              width="32"
              height="32"
            >
              <use xlink:href="@/assets/images/icon-sprite.svg#settings" />
            </svg>
          </router-link>
        </li>
      </ul>
      <ul class="mt-auto">
        <li class="mb-8">
          <a
            href="//docs.yorokobi.com"
            class="hover:bg-indigo-500 focus:bg-indigo-400 p-4 pb-5 rounded"
          >
            <svg
              class="fill-current text-white inline-block"
              width="34"
              height="34"
            >
              <use xlink:href="@/assets/images/icon-sprite.svg#help" />
            </svg>
          </a>
        </li>
        <li class="mb-6">
          <a
            href="#"
            @click.prevent="logout"
            class="hover:bg-indigo-500 focus:bg-indigo-400 p-4 pb-5 rounded"
          >
            <svg
              class="fill-current text-white inline-block"
              width="34"
              height="34"
            >
              <use xlink:href="@/assets/images/icon-sprite.svg#logout" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { authComputed } from '@/store/helpers.js'
import { mapActions } from 'vuex'
export default {
  props: ['handle'],
  computed: {
    ...authComputed
  },
  methods: mapActions(['logout'])
}
</script>
