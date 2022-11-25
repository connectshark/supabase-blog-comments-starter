<template>
  <div class=" min-h-screen grid place-items-center">
    <div class=" text-center">
      <p>
        <i class='bx bx-loader bx-spin bx-md' ></i>
      </p>
      <p>登入中...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfile } from '../composable/api-core'
import { useLoginState } from '../composable/useAuth'
const { getUser, errMsg } = useLoginState()
const { fetchProfile } = useProfile()
const router = useRouter()
const route = useRoute()

onMounted( async () => {
  await getUser()
  if (errMsg.value !== '') {
    router.replace({
      path: '/login',
      query: {
        redirect: route.query.redirect
      }
    })
  } else {
    await fetchProfile()
    router.replace(route.query.redirect)
  }
})
</script>