<script setup>
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { currentUser, isAuthenticated, signOut } = useAuth()

const userInitial = computed(() => {
  if (!currentUser.value?.username) {
    return 'U'
  }

  return currentUser.value.username.slice(0, 1).toUpperCase()
})

const handleSignOut = () => {
  signOut()
  router.push('/login')
}
</script>

<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between gap-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_100%)] shadow-[0_16px_30px_-20px_rgba(37,99,235,0.7)]">
            <svg
              viewBox="0 0 40 40"
              class="h-6 w-6 text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 14.5V13.5C13 11.8431 14.3431 10.5 16 10.5H24C25.6569 10.5 27 11.8431 27 13.5V14.5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <rect
                x="9.5"
                y="14.5"
                width="21"
                height="14"
                rx="4.5"
                stroke="currentColor"
                stroke-width="2.2"
              />
              <path
                d="M9.5 19.5H30.5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <circle cx="24.5" cy="24" r="1.6" fill="currentColor" />
              <circle cx="19.9" cy="24" r="1.6" fill="currentColor" opacity="0.85" />
              <circle cx="15.3" cy="24" r="1.6" fill="currentColor" opacity="0.7" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">JobForum</span>
        </RouterLink>
        
        <div class="flex items-center gap-4 sm:gap-6">
          <RouterLink 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition font-medium"
            active-class="text-blue-600"
          >
            Lowongan
          </RouterLink>
          <RouterLink 
            to="/forum" 
            class="text-gray-600 hover:text-blue-600 transition font-medium"
            active-class="text-blue-600"
          >
            Forum
          </RouterLink>
          <RouterLink 
            to="/chat" 
            class="text-gray-600 hover:text-blue-600 transition font-medium"
            active-class="text-blue-600"
          >
            Grup Chat
          </RouterLink>
          <template v-if="isAuthenticated">
            <RouterLink
              to="/profile"
              class="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              active-class="ring-2 ring-blue-200"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {{ userInitial }}
              </span>
              <span class="hidden sm:inline">Profil</span>
            </RouterLink>
            <button
              type="button"
              class="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
              @click="handleSignOut"
            >
              Keluar
            </button>
          </template>
          <RouterLink
            v-else
            to="/login"
            class="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
            active-class="ring-2 ring-blue-200"
          >
            Masuk
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
