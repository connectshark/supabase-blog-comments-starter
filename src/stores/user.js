import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      id: '',
      email: '',
      username: '',
      avatar: ''
    }
  }),
  getters: {
    isLogin () {
      return this.user.id !== ''
    }
  },
  actions: {
  }
})
