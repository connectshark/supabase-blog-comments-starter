<template>
  <p></p>
  <h2>{{ results.title }}</h2>
</template>

<script setup>
import { useArticles } from '../composable/api-core'
import { useUserStore } from '../stores/user'

const store = useUserStore()

const props = defineProps({
  id: String
})

const {
  results,
  loading
} = useArticles({ selectString: `*`, targetId: props.id })
</script>