<template>
  <h2 class=" bg-primary py-10 text-white text-center font-bold text-3xl mb-8 leading-loose shadow-[0_0_0_100vmax_#7a6ae1] path">登入</h2>
  <div class=" max-w-lg mx-auto w-5/6">
    <form class="mb-4" @submit.prevent="handlerLogin">
      <p class="mb-4">
        <input :disabled="loading" v-model="loginData.email" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-300"
          placeholder="信箱" type="email">
      </p>
      <p class="mb-4">
        <input :disabled="loading" v-model="loginData.password" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-300"
          placeholder="密碼" type="password">
      </p>
      <div class=" flex justify-end items-center space-x-6">
        <span class=" text-amber-600" v-if="errMsg">好像哪裡出錯了</span>
        <button :disabled="loading" class="text-md font-bold hover:opacity-80 text-white bg-primary py-4 w-24 rounded-full"
          type="submit">
          <span v-if="!loading">登入</span>
          <span v-else><i class='bx bx-loader-alt bx-spin' ></i></span>
        </button>
      </div>
    </form>
    <div class="text-center">
      <p class="text-stone-600 mb-4">還沒有帳號？ <router-link replace to="/signup" class=" underline">立刻註冊</router-link></p>
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
import { useLogin } from '../composable/useAuth'
const loginData = reactive({
  email: '',
  password: ''
})
const { loading, login, errMsg } = useLogin()
const { fetchProfile } = useProfile()
const router = useRouter()
const handlerLogin = async () => {
  await login({
    email: loginData.email,
    password: loginData.password
  })
  if (errMsg.value !== '') return 
  await fetchProfile()

  router.push('/')
}
</script>