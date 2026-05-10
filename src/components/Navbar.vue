<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">J</span>
          </div>
          <span class="text-xl font-bold text-gray-800">JobForum</span>
        </RouterLink>
        
        <div class="flex gap-6">
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
        </div>
      </div>
    </div>
  </nav>
</template>