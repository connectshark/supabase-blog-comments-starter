<template>
    <form @submit.prevent="addArticleHandler">
      <div>
        <p>
          <label for="article_title">Title</label>
        </p>
        <p>
          <input required minlength="1" v-model="content.title" class="w-full rounded-lg focus:border-primary" id="article_title" type="text" placeholder="Title">
        </p>
      </div>
      <div>
        <p>
          <label for="article_description">Description</label>
        </p>
        <p>
          <input required minlength="1" v-model="content.description" class="w-full rounded-lg focus:border-primary" id="article_description" type="text" placeholder="Description">
        </p>
      </div>
      <div>
        <p>
          <label for="article_content">Content</label>
        </p>
        <textarea required minlength="1" v-model="content.content" id="article_content" class="w-full rounded-lg focus:border-primary resize-none" placeholder="Content" cols="30" rows="6"></textarea>
      </div>
      <div>
        <input v-model="content.is_published" type="checkbox" id="Is_published">
        <label class=" inline-block ml-4" for="Is_published">是否發佈</label>
      </div>
      <div class=" text-right">
        <button class="bg-primary text-white p-3 rounded-xl" type="submit">
          <span v-if="loading"><i class='bx bx-loader bx-spin'></i></span>
          <span>發佈文章</span>
        </button>
      </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useArticle } from '../composable/api-core'
import { useUserStore } from '../stores/user'
const store = useUserStore()

const {
  addArticle,
  loading
} = useArticle({ user_id: store.id })

const content = reactive({
  title: '',
  description: '',
  content: '',
  is_published: false
})

const addArticleHandler = async () => {
  await addArticle({
    title: content.title,
    description: content.description,
    content: content.content,
    is_published: content.is_published
  })
}
</script>