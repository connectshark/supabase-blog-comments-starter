import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '../stores/user'
import supabase from '../supabase'

export const useArticles = ({ selectString = '*', targetId = '', user_id = '' }) => {
  const loading = ref(false)
  const results = ref([])
  const doFetch = async () => {
    loading.value = true
    let query = supabase
      .from('article')
      .select(selectString)

    if (targetId) {
      query = query.eq('id', targetId)
        .single()
    }
    if (user_id) {
      query = query.eq('user_id', user_id)
    }
    const { data } = await query
    loading.value = false
    results.value = data
  }
  doFetch()
  return {
    reload: doFetch,
    loading,
    results
  }
}

export const useComment = ({ article_id }) => {
  const loading = ref(false)
  const error = ref(false)
  const comments = ref([])

  const addComment = async ({ content, user_id }) => {
    loading.value = true
    const { error: commentError } = await supabase.from('comment')
      .insert([{ content, article_id, user_id }])
    loading.value = false
    if (commentError?.message) error.value = commentError.message
    await getComment()
  }

  const deleteComment = async ({ id }) => {
    loading.value = true
    const { error: commentError } = await supabase.from('comment')
      .delete()
      .eq('id', id)
    loading.value = false
    if (commentError?.message) error.value = commentError.message
    await getComment()
  }

  const getComment = async () => {
    loading.value = true
    const { data, error: commentError } = await supabase
      .from('comment')
      .select('content, id, user_id, profiles(username))')
      .eq('article_id', article_id)
    loading.value = false
    comments.value = data
    if (commentError?.message) error.value = commentError.message
  }

  onBeforeMount(getComment)
  return {
    deleteComment,
    addComment,
    loading,
    error,
    comments
  }
}

export const useProfile = () => {
  const loading = ref(false)
  const errMsg = ref('')
  const store = useUserStore()
  const doFetch = async () => {
    loading.value = true
    errMsg.value = ''
    const { data: { session } } = await supabase.auth.getSession()
    const { data: userData, error } = await supabase
      .from('profiles')
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

  const updateEmail = async (newEmail) => {
    loading.value = true
    const { data, error } = await supabase
      .from('profiles')
      .update({ email: newEmail })
      .eq('id', store.user.id)
    loading.value = false
    if (error?.message) {
      errMsg.value = error.message
    } else {
      store.user.email = newEmail
    }
  }
  return {
    fetchProfile: doFetch,
    loading,
    errMsg,
    updateEmail
  }
}

export const useArticle = ({ user_id }) => {
  const loading = ref(false)
  const addArticle = async ({ title, description, content, is_published }) => {
    loading.value = true
    const { data, error } = await supabase.from('article')
      .insert([{ title, description, content, is_published, user_id }])
    loading.value = false
  }

  const updateArticle = async (updateContent, { article_id }) => {
    loading.value = true
    await supabase.from('article')
      .update(updateContent)
      .eq('id', article_id)
    loading.value = false
  }
  return {
    addArticle,
    loading,
    updateArticle
  }
}