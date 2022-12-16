<template>
  <header class=" bg-slate-700 p-6">
    <div class="flex items-center justify-between container max-w-xl mx-auto">
      <router-link to="/">
        <h1 class=" text-white">BLOG</h1>
      </router-link>
      <div>
        <router-link v-if="store.user.username" to="/profile" class="text-white hover:underline">{{ store.user.username }}</router-link>
        <button v-if="store.isLogin && route.path === '/profile'" class="text-white hover:underline inline-block" type="button" @click="logoutPanel = true">登出</button>
        <button v-else-if="!store.isLogin" class="text-white hover:underline inline-block" type="button" @click="showPanel = true">登入</button>
      </div>
    </div>
  </header>
  <Modal :showPanel="logoutPanel" :closeModal="() => {logoutPanel = false}">
    <h3 class=" bg-primary text-2xl text-center py-10 font-bold text-white">確定登出?</h3>
    <div class="py-10 text-center space-x-8">
      <button class="hover:opacity-80 transition-opacity bg-stone-400 text-white inline-block px-10 leading-loose rounded" type="button" @click="logoutHandler">是</button>
      <button class="hover:opacity-80 transition-opacity bg-primary text-white inline-block px-10 leading-loose rounded" type="button" @click="logoutPanel = false">否</button>
    </div>
  </Modal>
  <AuthPanel :showPanel="showPanel" :closeModal="() => {showPanel = false}"/>

  <main class=" container max-w-2xl mx-auto px-6">
    <router-view />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import AuthPanel from './components/AuthPanel.vue'
import { useUserStore } from './stores/user'
import { useLogout } from './composable/useAuth'
import Modal from './components/Modal.vue'
import { useProfile } from './composable/api-core'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useUserStore()
const showPanel = ref(false)

const logoutPanel = ref(false)

const {
  fetchProfile
} = useProfile()

const {
  doLogout
} = useLogout()

fetchProfile()

const logoutHandler = async () => {
  await doLogout()
  logoutPanel.value = false
}
</script>