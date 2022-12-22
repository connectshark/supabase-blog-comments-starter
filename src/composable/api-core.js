import { ref, watchEffect } from 'vue'
import { useUserStore } from '../stores/user'
import supabase from '../supabase'

export const useLinks = () => {
  const TABLE_NAME = 'links'
  const loading = ref(false)
  const results = ref([])
  const store = useUserStore()

  const getLinks = async () => {
    loading.value = true
    const { data } = await supabase.from(TABLE_NAME).select('*')
      .eq('owner_id', store.user.id)
      .is('isActive', true)
    loading.value = false
    results.value = data
  }

  const deleteLink = async ({ id }) => {
    loading.value = true
    await supabase.from(TABLE_NAME)
      .update({ isActive: false })
      .eq('id', id)
    await getLinks()
  }

  const addLink = async ({ url = '', sub_id = [] }) => {
    await supabase.from(TABLE_NAME)
      .insert([
        { owner_id: store.user.id, url: url, sub_id: sub_id }
      ])
    await getLinks()
  }

  watchEffect(() => {
    if (store.user.id) {
      getLinks()
    }
  })

  return {
    loading,
    results,
    deleteLink,
    reload: getLinks,
    addLink
  }
}


export const useProfile = () => {
  const TABLE_NAME = 'profiles'
  const loading = ref(false)
  const errMsg = ref('')
  const store = useUserStore()
  const doFetch = async () => {
    loading.value = true
    errMsg.value = ''

    const { data: { session } } = await supabase.auth.getSession()
    if (session === null) {
      loading.value = false
    } else {
      const { data: userData, error } = await supabase.from(TABLE_NAME)
        .select('*')
        .eq('id', session.user.id)
        .single()
      loading.value = false
      if (error?.message) {
        errMsg.value = error.message
      } else {
        store.user.id = userData.id
        store.user.email = userData.email
        store.user.username = userData.username
        store.user.avatar = userData.avatar_url
      }
    }
  }

  const updateProfile = async ({ filedName, newValue }) => {
    loading.value = true
    errMsg.value = ''
    const updateObject = {}
    updateObject[filedName] = newValue

    const { error } = await supabase.from(TABLE_NAME)
      .update(updateObject)
      .eq('id', store.user.id)
    loading.value = false
    if (error?.message) {
      errMsg.value = error.message
    } else {
      doFetch()
    }
  }

  return {
    fetchProfile: doFetch,
    loading,
    errMsg,
    updateProfile
  }
}
