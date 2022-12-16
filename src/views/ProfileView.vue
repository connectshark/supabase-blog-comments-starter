<template>
  <div class=" py-4">
    <router-link class="text-xl block text-primary bg-white align-middle rounded-lg p-4 mb-10" to="/">
      <i class='bx bxs-chevron-left align-middle'></i>回首頁
    </router-link>
    <div class="pt-20 bg-primary rounded-xl overflow-hidden">
      <div class=" bg-white px-4 rounded-xl pb-8">
        <p class=" relative -top-4">
          <img class="w-12 h-12 rounded-full bg-white object-cover mx-auto ring ring-primary" :src="store.user.avatar" :alt="store.user.username">
        </p>
        <h1 class="text-xl text-center leading-loose font-bold mb-2">{{ store.user.username }}</h1>
        <p v-if="!editEmail" class="leading-loose flex items-center border rounded-lg px-4 py-2">
          <span>
            <i class='bx bx-envelope bx-sm align-middle'></i>
          </span>
          <span class=" ml-4">{{ store.user.email }}</span>
          <button @click="editEmail = true" type="button" class="ml-auto hover:bg-primary/20 p-2 rounded-2xl">
            <i class='bx bx-edit-alt align-middle bx-sm'></i>
          </button>
        </p>
        <form v-else @submit.prevent="updateEmail(email)">
          <p class="relative mb-4">
            <span class=" absolute left-4 top-2 text-primary">
              <i class='bx bx-envelope bx-sm align-middle'></i>
            </span>
            <input required type="email" v-model="email" class=" w-full rounded-lg pl-14">
          </p>
          <p class=" text-right">
            <button type="submit" class="p-2 hover:bg-primary/20 rounded-lg inline-block">修改</button>
            <button @click="editEmail = false" type="button" class="p-2 hover:bg-primary/20 rounded-lg inline-block">取消</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useProfile } from '../composable/api-core'

const store = useUserStore()

const editEmail = ref(true)

const email = ref('')

const {
  updateEmail
} = useProfile()
</script>