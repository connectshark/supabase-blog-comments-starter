import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    username: ''
  }),
  getters: {
  },
  actions: {
  }
})
