<template>
  <div class="text-center">
    <p>
      <i class='bx bx-loader bx-spin bx-lg' ></i>
    </p>
    <p>
      登入中...
    </p>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const store = useUserStore()

const props = defineProps({
  path: String
})

watchEffect(() => {
  if (store.isLogin) {
    router.replace(props.path)
  }
})
</script>