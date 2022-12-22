<template>
<p v-if="!props.isEdit" class="leading-loose flex items-center border rounded-lg px-4 py-2 mb-6">
  <slot />
  <button @click="props.callback" type="button" class="ml-auto hover:bg-primary/20 p-2 rounded-2xl">
    <i class='bx bx-edit-alt align-middle bx-sm'></i>
  </button>
</p>
<form v-else v-bind="$attrs" class="mb-6">
  <p class="relative mb-4">
    <slot name="input"/>
  </p>
  <p class=" text-right space-x-2">
    <button :disabled="props.loading" type="submit" class="p-2 hover:bg-primary/20 rounded-lg inline-block disabled:bg-stone-100">
      <span v-if="props.loading"><i class='bx bx-dots-horizontal-rounded'></i></span>
      <span v-else>修改</span>
    </button>
    <button :disabled="props.loading" type="button" @click="props.cancelEdit"
      class="p-2 hover:bg-primary/20 rounded-lg inline-block disabled:bg-stone-100">取消</button>
  </p>
</form>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
  callback: Function,
  isEdit: Boolean,
  cancelEdit: Function
})
</script>

<script>
export default {
  inheritAttrs: false
}
</script>