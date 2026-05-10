import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import GroupChat from '../views/GroupChat.vue'
import JobDetail from '../views/JobDetail.vue'
import ForumPost from '../views/ForumPost.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/forum', name: 'Forum', component: Forum },
  { path: '/forum/:id', name: 'ForumPost', component: ForumPost },
  { path: '/chat', name: 'GroupChat', component: GroupChat },
  { path: '/job/:id', name: 'JobDetail', component: JobDetail },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'Login' }
  }

  if (isAuthenticated.value && (to.name === 'Login' || to.name === 'Register')) {
    return { name: 'Profile' }
  }

  return true
})

export default router
