<template>
  <div v-if="loading">
    <p class=" text-center"><i class='bx bx-md bx-loader-alt bx-spin'></i></p>
  </div>
  <article v-else>
    <h1 class=" py-10 text-center text-2xl text-white bg-primary   shadow-[0_0_0_100vmax_#7a6ae1] path">{{
        results.title
    }}</h1>
    <p class=" py-4 break-words">{{ results.content }}</p>
  </article>
  <template v-if="results.user_id === store.id">

    <h3 class=" text-center text-2xl text-white bg-primary">文章編輯</h3>
    <div>
      <p class="py-3">
        <input v-model="is_published" :disabled="updateLoading" @change="updateArticleHandler" type="checkbox"
          id="Is_published"><label class=" inline-block ml-4" for="Is_published">是否發佈</label>
      </p>
    </div>
  </template>
  <h3 class=" text-center text-2xl text-white bg-primary">評論</h3>
  <ul v-auto-animate>
    <li v-if="commentLoading" class=" text-center"><i class='bx bx-md bx-loader-alt bx-spin'></i></li>
    <li v-for="comment in comments" :key="comment.user_id" class=" bg-gray-200 p-5 mb-5">
      <p class=" leading-loose">{{ comment.profiles.username }}</p>
      <p class=" leading-loose">{{ comment.content }}</p>
      <p class=" text-right"
        v-if="store.id && store.id === results.user_id || store.id && store.id === comment.user_id">
        <button @click="deleteComment({ id: comment.id })" type="button" class=" text-primary underline">刪除</button>
      </p>
    </li>
  </ul>
  <form @submit.prevent="addCommentHandler">
    <h3 class=" text-center text-2xl text-white bg-primary mb-5">新增評論</h3>
    <textarea required minlength="1" v-model="comment" :disabled="!store.id"
      class=" disabled:bg-gray-200 w-full resize-none rounded-lg border-2 border-gray-300 focus:border-primary appearance-none outline-none p-6"
      cols="30" rows="3"></textarea>
    <div class=" text-right">
      <button type="submit" v-if="store.id" class=" bg-primary text-white p-3 rounded-xl">
        <span v-if="commentLoading"><i class='bx bx-loader bx-spin'></i></span>
        <span v-else>送出</span>
      </button>
      <router-link class=" text-primary underline" v-else to="/login">登入發表評論</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useArticle, useArticles, useComment } from '../composable/api-core'
import { useUserStore } from '../stores/user'

const store = useUserStore()

const props = defineProps({
  id: String
})
const {
  results,
  loading
} = useArticles({ selectString: `*`, targetId: props.id })

const { updateArticle, loading: updateLoading } = useArticle({ user_id: store.id })

const is_published = ref(false)
watchEffect(() => {
  is_published.value = results.value?.is_published ? results.value.is_published : false
})
const updateArticleHandler = async () => {
  await updateArticle({ is_published: is_published.value }, { article_id: props.id })
}

const comment = ref('')
const {
  addComment,
  loading: commentLoading,
  deleteComment,
  comments
} = useComment({ article_id: props.id })

const addCommentHandler = async () => {
  await addComment({
    content: comment.value,
    user_id: store.id
  })
  comment.value = ''
}
</script>