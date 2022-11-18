import { ref } from 'vue'
import supabase from '../supabase'

export const useArticles = ({ selectString = '*', targetId = '' }) => {
  const loading = ref(false)
  const results = ref([])
  const doFetch = () => {
    loading.value = true
    let query = supabase
      .from('article')
      .select(selectString)
      .eq('isPublic', true)
    
    if (targetId) {
      query = query.eq('id', targetId)
    }
    query.then(res => {
      loading.value = false
      results.value = res.data
    })
  }
  doFetch()
  return {
    reload: doFetch,
    loading,
    results
  }
}

export const useUser = () => {
  const loading = ref(false)
  const results = ref(null)
  const error = ref(false)
  const doFetch = () => {
    loading.value = true
    supabase.auth.getUser()
      .then(res => {
        loading.value = false
        results.value = res.data.user
      })
  }
  doFetch()
  return {
    reload: doFetch,
    loading,
    results
  }
}