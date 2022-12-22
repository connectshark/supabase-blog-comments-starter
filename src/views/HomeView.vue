<template>
  <div>
    <h1 class="text-2xl leading-loose mb-6">轉換紀錄</h1>
    <p v-if="loading" class=" text-center">
      <i class='bx bx-loader bx-spin bx-md' ></i>
    </p>
    <ul v-else>
      <li v-for="link in results" :key="link.id">
        <h4>
          <span class="text-xl bg-gray-300 inline-block p-1 rounded-lg">{{ link.url }}</span>
        </h4>
        <p v-if="link.sub_id.length > 0" class=" space-x-2">
          <span class=" bg-stone-800 text-stone-100 inline-block p-1 rounded-md text-sm" v-for="(sub, index) in link.sub_id" :key="index">{{ sub }}</span>
        </p>
        <p>
          <button type="button" @click="deleteLink({ id: link.id })">刪除</button>
        </p>
      </li>
    </ul>
    <p>
      <button type="button" @click="addLink()">新增</button>
    </p>
  </div>
</template>

<script setup>
import { useLinks } from '../composable/api-core'

const {
  loading,
  results,
  deleteLink,
  addLink
} = useLinks()

</script>