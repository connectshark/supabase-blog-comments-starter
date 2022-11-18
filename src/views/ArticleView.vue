<template>
  <main class=" container max-w-2xl mx-auto p-6">
    <div v-if="loading">
      <p class=" text-center"><i class='bx bx-md bx-loader-alt bx-spin' ></i></p>
    </div>
    <article v-else>
      <h1 class=" text-center text-2xl text-white bg-primary   shadow-[0_0_0_100vmax_#7a6ae1] path">{{ results[0].title }}</h1>
      <p class=" py-4 break-words">{{ results[0].content }}</p>
      <h3 class=" text-center text-2xl text-white bg-primary">評論</h3>
      <div v-if="commentLoading">
        <p class=" text-center"><i class='bx bx-md bx-loader-alt bx-spin' ></i></p>
      </div>
      <ul v-else>
        <li v-for="comment in results[0].comment" :key="comment.user_id" class=" bg-gray-200 p-5 mb-5">
          <p class=" leading-loose">{{ comment.profiles.username }}</p>
          <p class=" leading-loose">{{ comment.content }}</p>
          <p class=" text-right">
            <button type="button" class=" text-primary underline">刪除</button>
          </p>
        </li>
      </ul>
    </article>
  </main>
</template>

<script setup>
import { useUser, useArticles } from '../composable/api-core'
const props = defineProps({
  id: String
})
const { results, loading } = useArticles({ selectString: `*, comment(content, user_id, profiles(username))`,targetId: props.id })


const { results: userData } = useUser()

</script>