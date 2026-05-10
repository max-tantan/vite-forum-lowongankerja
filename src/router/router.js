import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import GroupChat from '../views/GroupChat.vue'
import JobDetail from '../views/JobDetail.vue'
import ForumPost from '../views/ForumPost.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/forum', name: 'Forum', component: Forum },
  { path: '/forum/:id', name: 'ForumPost', component: ForumPost },
  { path: '/chat', name: 'GroupChat', component: GroupChat },
  { path: '/job/:id', name: 'JobDetail', component: JobDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router