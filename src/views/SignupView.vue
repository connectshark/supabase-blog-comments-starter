<template>
  <h2 class=" bg-primary py-10 text-white text-center font-bold text-3xl mb-8 leading-loose">註冊</h2>
  <div class=" max-w-lg mx-auto w-5/6">
    <form class="mb-4" @submit.prevent="handlerSignup">
      <p class="mb-4">
        <input :disabled="loading" v-model="signupData.email" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-300"
          placeholder="信箱" type="email">
      </p>
      <p class="mb-4">
        <input :disabled="loading" v-model="signupData.password" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-300"
          placeholder="密碼" type="password">
      </p>
      <div class=" flex justify-end items-center space-x-6">
        <span class=" text-amber-600" v-if="error">好像哪裡出錯了</span>
        <button :disabled="loading" class="text-md font-bold hover:opacity-80 text-white bg-primary py-4 w-24 rounded-full"
          type="submit">
          <span v-if="!loading">註冊</span>
          <span v-else><i class='bx bx-loader-alt bx-spin' ></i></span>
        </button>
      </div>
    </form>
    <div class="text-center">
      <p class="text-stone-600 mb-4">有帳號了？ <router-link to="/login" replace class=" underline">前往登入</router-link></p>
      <p>
        <router-link class=" underline" to="/">回首頁</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useProfile } from '../composable/api-core'
import { useSignUp } from '../composable/useAuth'
const { loading, signup, error } = useSignUp()
const signupData = reactive({
  email: '',
  password: ''
})
const { fetchProfile } = useProfile()
const router = useRouter()
const handlerSignup = async () => {
  await signup({
    email: signupData.email,
    password: signupData.password
  })
  await fetchProfile()
  router.push('/')
}
</script>