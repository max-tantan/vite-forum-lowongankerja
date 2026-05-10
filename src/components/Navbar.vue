<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between gap-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">J</span>
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
          <RouterLink
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
