<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
import AndroidLayout from './layout/AndroidLayout.vue'
import ToastNotify from './components/ToastNotify.vue'
</script>

<template>
  <ToastNotify />
  <!-- Desktop Layout: visible on md and above -->
  <div class="hidden md:flex min-h-screen flex-col bg-gray-50">
    <Navbar />
    <main class="container mx-auto flex-1 px-4 py-6">
      <RouterView />
    </main>
    <Footer />
  </div>

  <!-- Mobile / Android Layout: visible below md -->
  <div class="md:hidden">
    <AndroidLayout>
      <RouterView />
    </AndroidLayout>
  </div>
</template>
