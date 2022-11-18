<template>
  <main class=" container max-w-2xl mx-auto p-6">
    <div v-if="loading">
      <p class=" text-center"><i class='bx bx-md bx-loader-alt bx-spin' ></i></p>
    </div>
    <ul v-else>
      <li v-for="article in results" :key="article.id">
        <h2 class="text-xl leading-loose">{{article.title}}</h2>
        <p>{{ article.description }}</p>
        <p class=" text-right">
          <router-link class="leading-loose bg-primary underline p-1 rounded text-white" :to="`/article/${article.id}`">閱讀文章</router-link>
        </p>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { useArticles } from '../composable/api-core'

const { results, loading } = useArticles({
  selectString :`title,id,description`
})


</script>