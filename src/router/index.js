import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      props: true
    },
    {
      path: '/edit/:id',
      name: 'editArticle',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/EditArticleView.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/new',
      name: 'newPost',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/NewArticle.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/pending',
      name: 'pending',
      component: () => import('../views/PendingView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useUserStore()
  if (to.meta.requireAuth && !store.id) {
    return {
      path: '/pending',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
