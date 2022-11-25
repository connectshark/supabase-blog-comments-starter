import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import supabase from '../supabase'

const useLogin = () => {
  const errMsg = ref('')
  const loading = ref(false)
  const store = useUserStore()

  const doLogin = async ({ email, password }) => {
    loading.value = true
    errMsg.value = ''
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    loading.value = false
    if (error?.message) {
      errMsg.value = error.message
    } else {
      store.id = user.id
      store.username = user.username
    }
  }
  return {
    loading,
    errMsg,
    login: doLogin
  }
}

const useSignUp = () => {
  const errMsg = ref('')
  const loading = ref(false)
  const store = useUserStore()
  const doSignUp = async ({ email, password }) => {
    loading.value = true
    errMsg.value = ''
    const { data: { user }, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    loading.value = false
    if (error?.message) {
      errMsg.value = error.message
    } else {
      store.id = user.id
    }
  }
  return {
    loading,
    errMsg,
    signup: doSignUp
  }
}

const useFBLogin = () => {
  const path = import.meta.env.VITE_CALLBACK_URL + '/callback/'

  const doFetch = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: path
      }
    })
  }

  return {
    loginFB: doFetch
  }
}

const useForgotPsd = () => {
  const loading = ref(false)
  const success = ref(false)
  const error = ref(null)
  const path = import.meta.env.VITE_CALLBACK_URL + '/reset/'
  const doFetch = email => {
    loading.value = true
    success.value = false
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: path
    }).then(res => {
      loading.value = false
      success.value = true
      error.value = res.error
    })
  }
  
  return {
    forgotPsd: doFetch,
    loading,
    success,
    error
  }
}

const useUpdateUser = () => {
  const loading = ref(false)
  const success = ref(false)
  const doFetch = ({ password, email }) => {
    loading.value = true
    success.value = false
    supabase.auth.updateUser({
      email: email,
      password: password
    }).then(res => {
      loading.value = false
      if (res.error) {
        success.value = false
      } else {
        success.value = true
      }
    })
  }
  return {
    updateUser: doFetch,
    loading,
    success
  }
}

const useLogout = () => {
  const loading = ref(false)
  const route = useRoute()
  const router = useRouter()
  const store = useUserStore()
  const doLogout = async () => {
    await supabase.auth.signOut()
    store.id = ''
    store.username = ''
  }
  if (route.meta?.requireAuth) {
    router.push('/login')
  }
  return {
    loading,
    doLogout
  }
}

const useLoginState = () => {
  const store = useUserStore()
  const errMsg = ref('')
  const loading = ref(false)
  const getUser = async () => {
    loading.value = true
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error?.message) {
      errMsg.value = error.message
    } else {
      store.id = user.id
    }
    loading.value = false
  }
  return {
    errMsg,
    loading,
    getUser
  }
}

export {
  useFBLogin,
  useLogin,
  useSignUp,
  useForgotPsd,
  useUpdateUser,
  useLogout,
  useLoginState
}