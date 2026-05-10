<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <Navbar />
    <main class="container mx-auto flex-1 px-4 py-6">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
