<template>
  <div class="new-workspace m-auto p-8 h-full w-full">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">
      Create a new Workspace
    </h1>
    <form
      class="bg-white shadow-md rounded mb-4"
      @submit.prevent="createWorkspace"
    >
      <div class="p-6 border-b-2 block">
        <label for="name" class="block text-gray-700 text-sm mb-2 font-bold"
          >Workspace Name</label
        >
        <input
          v-model.trim="name"
          type="input"
          name="name"
          ref="name"
          placeholder="Your Workspace"
          value
          @blur="$v.name.$touch()"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
          :class="
            $v.name.$error
              ? 'focus:bg-red-100 bg-red-100 border-red-600'
              : 'focus:border-indigo-500'
          "
        />
        <div
          v-if="$v.name.$error"
          class="text-sm mt-2 font-medium text-red-600"
        >
          <p v-if="!$v.name.required">
            Please enter a name for your workspace.
          </p>
        </div>
      </div>
      <div class="p-6 border-b-2 block">
        <label for="handle" class="block text-gray-700 text-sm mb-2 font-bold"
          >Workspace URL</label
        >
        <div class="flex flex-row">
          <span
            class="flex items-center bg-gray-200 rounded rounded-r-none px-3 font-medium text-gray-700"
            >yorokobi.com/</span
          >
          <input
            v-model.trim="handle"
            type="input"
            name="handle"
            placeholder="workspace"
            @keyup="disableAutomaticHandle"
            @blur="$v.handle.$touch()"
            value
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded-l-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            :class="
              $v.handle.$error
                ? 'focus:bg-red-100 bg-red-100 border-red-600'
                : 'focus:border-indigo-500'
            "
          />
        </div>
        <div
          v-if="$v.handle.$error"
          class="text-sm mt-2 font-medium text-red-600"
        >
          <p v-if="!$v.handle.required">
            Please chose a unique handle name for your workspace.
          </p>
          <p v-if="!$v.handle.parametizable && $v.handle.required">
            Your handle name should contain only letters, numbers and hyphens
            (-).
          </p>
          <p v-if="!$v.handle.available">
            The handle you chosen is already taken. Please choose another one.
          </p>
        </div>
        <div class="text-sm mt-3 text-gray-700">
          Your workplace is accessible only by you and the people from your team
          you decided to give access to.
        </div>
      </div>
      <div class="p-6 block text-center">
        <button
          type="submit"
          name="button"
          class="bg-indigo-500 text-lg hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64"
        >
          Create new workspace
        </button>
        <span class="mx-3 text-gray-600">or</span>
        <router-link
          :to="{ name: 'workspaces' }"
          href="#"
          class="text-gray-600 underline font-medium"
          >Go back</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import FlexCenter from '@/mixins/FlexCenter.js'
import { email, required } from 'vuelidate/lib/validators'
import Vue from 'vue'

export default {
  mixins: [FlexCenter],
  data() {
    return {
      name: null,
      handle: null,
      automaticHandle: true,
      requestErrors: []
    }
  },
  watch: {
    name: 'generateAutomaticHandle'
  },
  methods: {
    createWorkspace() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('createWorkspace', {
            name: this.name,
            handle: this.handle
          })
          .then(() =>
            this.$router.push({
              name: 'workspace',
              params: { handle: this.handle }
            })
          )
          .catch(error => {
            if (error.response && error.response.status == 422) {
              this.requestErrors = error.response.data.errors
            }
          })
      }
    },
    disableAutomaticHandle() {
      if (this.automaticHandle) {
        this.automaticHandle = false
      }
    },
    generateAutomaticHandle() {
      if (this.automaticHandle) {
        this.handle = this.getParameterizedHandle()
      }
    },
    getParameterizedHandle() {
      let parameterized_name = this.name
        .toLowerCase()
        .replace(/\s+|_/g, '-')
        .match(/[a-zA-Z0-9-]/g)
      if (parameterized_name) {
        return parameterized_name.join('')
      }
    }
  },
  validations: {
    name: { required },
    handle: {
      required,
      parametizable(handle) {
        return /^[a-zA-Z0-9-]+$/.test(handle)
      },
      taken() {
        return !this._.filter(this.requestErrors, {
          field: 'handle',
          code: 'taken'
        }).length

        // if (this.requestErrors.length) {
        //   this.requestErrors.filter(error => {
        //     return error.field === 'handle' && error.code === 'taken'
        //   })
        // }
      }
    }
  }

  // validations() {
  //   let validations = {
  //     name: { required },
  //     handle: {
  //       required,
  //       parametizable(handle) {
  //         return /^[a-zA-Z0-9-]+$/.test(handle)
  //       },
  //       taken() {
  //         if (this.requestErrors.length) {
  //           return this.requestErrors['handle']['taken']
  //         }
  //       }
  //     }
  //   }

  // if (this.requestErrors.length) {
  //   this.requestErrors.forEach(function(error) {
  //     // if (!validations[error.field][error.code]) {
  //     //   validations[error.field][error.code] = error.code
  //     // }
  //     console.log(validations[error.field][error.code])
  //     // validations[error.field] = {
  //     //   [error.code]: error.code
  //     // }
  //   })
  // }

  // return validations

  // if (this.requestErrors.length) {
  //   this.requestErrors.forEach(function(error) {
  //     console.log(error.field)
  //     console.log(error.code)
  //     return {
  //       [error.field]: {
  //         [error.code]: error.code
  //       },
  //       name2: { email }
  //     }
  //   })
  // }
  // return {
  //   name: { required },
  //   handle: {
  //     required,
  //     parametizable(handle) {
  //       return /^[a-zA-Z0-9-]+$/.test(handle)
  //     }
  //   }
  // }
  // }
}
</script>

<style scoped>
.new-workspace {
  max-width: 640px;
}
</style>
