<template>
  <div v-if="loading">
    <p class=" text-center"><i class='bx bx-md bx-loader-alt bx-spin' ></i></p>
  </div>
  <ul v-auto-animate>
    <li class=" bg-white rounded-2xl shadow-xl p-4 mb-6 " v-for="article in sortArticles" :key="article.id">
      <h2 class="text-xl leading-loose">{{article.title}}</h2>
      <p>{{ article.description }}</p>
      <p class=" text-right">
        <router-link class="leading-loose bg-primary underline p-1 rounded text-white" :to="`/article/${article.id}`">閱讀文章</router-link>
      </p>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { useArticles } from '../composable/api-core'

const { results, loading } = useArticles({
  selectString :`title,id,description,created_at`
})

const sortArticles = computed(() => {
  return results.value.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
})

</script>