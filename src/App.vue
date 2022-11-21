<script setup>
import { useLoginState, useLogout } from './composable/useAuth'
import { useUserStore } from './stores/user'

const store = useUserStore()

const { errMsg } = useLoginState()
const { doLogout } = useLogout()
</script>

<template>
  <header class=" bg-slate-700 p-6">
    <div class="flex items-center justify-between container max-w-xl mx-auto">
      <router-link to="/">
        <h1 class=" text-white">BLOG</h1>
      </router-link>
      <div v-if="store.username">
        <span class=" inline-block text-white mr-4">Hi! {{ store.username }}</span>
        <router-link class=" text-white hover:underline inline-block mr-4" to="/new">新增文章</router-link>
        <button @click="doLogout()" class=" text-white inline-block" type="button">登出</button>
      </div>
      <router-link v-else class=" text-white hover:underline inline-block" to="/login">登入</router-link>
    </div>
  </header>
  <router-view />
</template>
