<template>
  <ul v-auto-animate>
    <router-link class="bg-white rounded-lg mb-6 p-6 hover:shadow-2xl flex items-center justify-between group transition-shadow"
      v-for="article in results"
      :key="article.id"
      :to="`/edit/${article.id}`"
    >
      <h2 class=" text-xl leading-loose w-4/5">{{ article.title }}</h2>
      <span class=" shrink-0 group-hover:text-primary">
        <i class='bx bxs-edit-alt bx-sm'></i>
      </span>
    </router-link>
  </ul>
</template>

<script setup>
import { useArticles } from '../composable/api-core'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const { results } = useArticles({
  user_id: store.id,
  selectString: `title,id`
})
</script>