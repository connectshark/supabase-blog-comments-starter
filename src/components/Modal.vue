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
        <slot />
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  closeModal: Function,
  showPanel: Boolean
})
</script>