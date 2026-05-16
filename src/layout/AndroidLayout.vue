<template>
  <div class="relative min-h-screen bg-gray-100 flex flex-col overflow-hidden font-sans">
    <!-- Top App Bar (Mobile only) -->
    <header class="bg-blue-600 text-white shadow-md z-10 sticky top-0 transition-all duration-300">
      <div class="flex items-center h-14 px-4">
        <!-- Back Button -->
        <button v-if="showBack" @click="goBack" class="mr-4 p-1 rounded-full hover:bg-blue-700 transition-colors active:scale-95">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <!-- Title -->
        <h1 class="text-lg font-semibold truncate flex-1">{{ title }}</h1>
        <!-- Actions slot -->
        <div class="flex items-center space-x-2">
          <slot name="actions">
            <button @click="testToast" class="p-1 rounded-full hover:bg-blue-700 transition-colors active:scale-95">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
          </slot>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto bg-gray-50 pb-20 custom-scrollbar relative scroll-smooth px-4 py-4">
      <slot />
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <router-link to="/" class="nav-item" exact-active-class="nav-item-active">
        <svg class="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span class="text-[10px]">Lowongan</span>
      </router-link>

      <router-link to="/forum" class="nav-item" active-class="nav-item-active">
        <svg class="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
        <span class="text-[10px]">Forum</span>
      </router-link>

      <router-link to="/chat" class="nav-item" active-class="nav-item-active">
        <svg class="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        <span class="text-[10px]">Chat</span>
      </router-link>

      <router-link to="/profile" class="nav-item" active-class="nav-item-active">
        <svg class="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        <span class="text-[10px]">Profil</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const route = useRoute()
const router = useRouter()
const { addToast } = useToast()

const testToast = () => {
  const types = ['success', 'error', 'info', 'warning']
  const randomType = types[Math.floor(Math.random() * types.length)]
  const messages = [
    'Berhasil menyimpan data lowongan!',
    'Gagal memuat koneksi, coba lagi.',
    'Ada pesan baru masuk.',
    'Peringatan: sesi kamu akan habis.'
  ]
  const randomMsg = messages[Math.floor(Math.random() * messages.length)]
  addToast(randomMsg, randomType)
}

const titleMap = {
  Home: 'Lowongan Kerja',
  Forum: 'Forum Diskusi',
  GroupChat: 'Grup Chat',
  Profile: 'Profil Saya',
  Login: 'Masuk',
  Register: 'Daftar',
  JobDetail: 'Detail Lowongan',
  ForumPost: 'Detail Postingan'
}

const title = computed(() => {
  if (route.meta && route.meta.title) return route.meta.title
  if (route.name && titleMap[route.name]) return titleMap[route.name]
  if (route.name) {
    return route.name.toString().replace(/([A-Z])/g, ' $1').trim()
  }
  return 'JobForum'
})

const mainTabs = ['/', '/forum', '/chat', '/profile', '/login', '/register']

const showBack = computed(() => {
  return !mainTabs.includes(route.path)
})

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.375rem 0;
  color: #6b7280;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #2563eb;
}

.nav-item-active {
  color: #2563eb;
  font-weight: 600;
}
</style>
