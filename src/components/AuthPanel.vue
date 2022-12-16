<template>
  <Teleport to="#modal">
    <Transition
      mode="out-in"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-700"
      enter-from-class="translate-y-5 opacity-0"
      leave-to-class="translate-y-5 opacity-0"
    >
    <div class="h-screen w-full bg-slate-700/50 fixed top-0 left-0 grid place-items-center" v-if="showPanel" @click="props.closeModal">
      <div class="w-4/5 bg-white rounded-lg shadow-lg max-w-sm overflow-hidden" @click.stop>
        <h3 class=" bg-primary text-2xl text-center py-10 font-bold text-white">登入</h3>
        <div class="py-10">
          <button type="button" class="bg-facebook w-52 mx-auto flex items-center space-x-4 rounded hover:opacity-80" @click="loginFB()">
            <p class="text-white">
              <i class='bx bxl-facebook bx-lg align-middle'></i>
            </p>
            <p class="text-white leading-loose">FACEBOOK</p>
          </button>
        </div>
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useFBLogin } from '../composable/useAuth'

const props = defineProps({
  closeModal: Function,
  showPanel: Boolean
})

const route = useRoute()

const {
  loginFB
} = useFBLogin({
  path: route.path
})

</script>