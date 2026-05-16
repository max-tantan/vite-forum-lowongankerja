<template>
  <div class="relative min-h-screen bg-gray-100 flex flex-col md:max-w-md md:mx-auto md:shadow-2xl overflow-hidden font-sans border-x border-gray-200">
    <!-- Status Bar (Simulated for Android) -->
    <div class="bg-blue-600 text-white px-4 py-1 flex justify-between items-center text-xs font-medium z-20 shadow">
      <span>12:00</span>
      <div class="flex items-center space-x-2">
        <!-- Icons for Wi-Fi, Signal, Battery -->
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21L15.6 16.2C14.6 15.4 13.4 15 12 15C10.6 15 9.4 15.4 8.4 16.2L12 21M12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3Z"/></svg>
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M2 22H22V2L2 22Z"/></svg>
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17 4H15V2H9V4H7C6.45 4 6 4.45 6 5V21C6 21.55 6.45 22 7 22H17C17.55 22 18 21.55 18 21V5C18 4.45 17.55 4 17 4Z"/></svg>
      </div>
    </div>

    <!-- Top App Bar -->
    <header class="bg-blue-600 text-white shadow-md z-10 sticky top-0 transition-all duration-300">
      <div class="flex items-center h-14 px-4">
        <!-- Back Button -->
        <button v-if="showBack" @click="goBack" class="mr-4 p-1 rounded-full hover:bg-blue-700 transition-colors active:scale-95">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <!-- Title -->
        <h1 class="text-lg font-semibold truncate flex-1">{{ title }}</h1>
        <!-- Slot for Top Actions -->
        <div class="flex items-center space-x-2">
          <slot name="actions">
            <!-- Example Notification Icon -->
            <button class="p-1 rounded-full hover:bg-blue-700 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
          </slot>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto bg-gray-50 pb-16 custom-scrollbar relative scroll-smooth">
      <!-- Animated transition for route changes if slot content changes -->
      <slot />
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="fixed md:absolute bottom-0 w-full md:max-w-md bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <router-link to="/" class="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-blue-600 transition-colors" active-class="text-blue-600 font-semibold">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span class="text-[10px]">Home</span>
      </router-link>
      
      <router-link to="/forum" class="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-blue-600 transition-colors" active-class="text-blue-600 font-semibold">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
        <span class="text-[10px]">Forum</span>
      </router-link>

      <!-- Floating Action Button effect for the middle action (e.g. Add Post / Special action) - Optional -->
      <!-- We can just keep chat here -->
      <router-link to="/chat" class="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-blue-600 transition-colors" active-class="text-blue-600 font-semibold">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        <span class="text-[10px]">Chat</span>
      </router-link>

      <router-link to="/profile" class="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-blue-600 transition-colors" active-class="text-blue-600 font-semibold">
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        <span class="text-[10px]">Profile</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Determine the title to show in the AppBar
const title = computed(() => {
  if (route.meta && route.meta.title) return route.meta.title
  if (route.name) {
    // Add spaces before capital letters (e.g., JobDetail -> Job Detail)
    return route.name.toString().replace(/([A-Z])/g, ' $1').trim()
  }
  return 'App'
})

// Define main tabs where the back button is hidden
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
/* Hide scrollbar for Chrome, Safari and Opera */
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.custom-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
