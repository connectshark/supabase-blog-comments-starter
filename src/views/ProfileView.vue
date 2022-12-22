<template>
  <div class=" py-4">
    <router-link class="text-xl block text-primary bg-white align-middle rounded-lg p-4 mb-10" to="/">
      <i class='bx bxs-chevron-left align-middle'></i>回首頁
    </router-link>
    <div class="pt-20 bg-primary rounded-xl overflow-hidden">
      <div v-auto-animate class=" bg-white px-4 rounded-xl pb-8">
        <p class=" relative -top-4">
          <img class="w-12 h-12 rounded-full bg-white object-cover mx-auto ring ring-primary" :src="store.user.avatar"
            :alt="store.user.username">
        </p>
        <h1 class="text-xl text-center leading-loose font-bold mb-2">{{ store.user.username }}</h1>
        <p v-if="errMsg" class=" text-rose-400 leading-loose">好像有什麼錯誤!!</p>

        <ProfileBar
          :loading="loading"
          :isEdit="activeBar === 1"
          :callback="() => activeBar = 1"
          :cancelEdit="cancelEdit"
          @submit.prevent="updateProfileData({ filedName: 'email', newValue: email })"
        >
          <span>
            <i class='bx bx-id-card bx-sm align-middle'></i>
          </span>
          <span class=" ml-4">{{ store.user.email }}</span>
          <template #input>
            <span class=" absolute left-4 top-3 text-primary">
              <i class='bx bx-id-card bx-sm align-middle'></i>
            </span>
            <input :disabled="loading" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required type="email" v-model="email"
              class="w-full rounded-lg pl-14 py-3 disabled:bg-stone-100" :placeholder="store.user.email">
          </template>
        </ProfileBar>
        <ProfileBar
          :loading="loading"
          :isEdit="activeBar === 2"
          :callback="() => activeBar = 2"
          :cancelEdit="cancelEdit"
          @submit.prevent="updateProfileData({ filedName: 'username', newValue: username })"
        >
          <span>
            <i class='bx bx-id-card bx-sm align-middle'></i>
          </span>
          <span class=" ml-4">{{ store.user.username }}</span>
          <template #input>
            <span class=" absolute left-4 top-3 text-primary">
              <i class='bx bx-id-card bx-sm align-middle'></i>
            </span>
            <input :disabled="loading" :placeholder="store.user.username" pattern="^[\u4e00-\u9fa5]+$|^[a-zA-Z\s]+$" minlength="1" maxlength="20" required type="text"
              v-model="username" class="w-full rounded-lg pl-14 py-3 disabled:bg-stone-100">
          </template>
        </ProfileBar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useProfile } from '../composable/api-core'
import ProfileBar from '../components/ProfileBar.vue'

const store = useUserStore()

const activeBar = ref(0)

const email = ref('')

const username = ref('')

const {
  updateProfile,
  loading,
  errMsg
} = useProfile()

const cancelEdit = () => {
  activeBar.value = 0
}


const updateProfileData = async ({ filedName, newValue }) => {
  await updateProfile({ filedName: filedName, newValue: newValue })
  cancelEdit()
}

</script>