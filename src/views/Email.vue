<template>
  <!-- Container luas penuh -->
  <div class="w-full bg-white min-h-[calc(100vh-4rem)] flex flex-col">
    <!-- Header/Toolbar ala Gmail -->
    <div class="px-4 py-3 border-b border-gray-200 flex items-center gap-4 bg-white sticky top-0 z-10">
      <div class="flex items-center gap-4 text-gray-500">
        <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
        <button class="hover:bg-gray-100 p-2 rounded-full transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
        <button class="hover:bg-gray-100 p-2 rounded-full transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
        </button>
      </div>
    </div>
    
    <!-- List Email ala Gmail -->
    <div class="flex-1 overflow-auto">
      <div 
        v-for="msg in messages" 
        :key="msg.id" 
        @click="readMessage(msg)"
        :class="[
          'group flex items-center gap-4 px-4 py-2 border-b border-gray-100 cursor-pointer transition-colors',
          msg.read ? 'bg-gray-50/50 hover:bg-gray-100/50' : 'bg-white hover:shadow-[inset_1px_0_0_#dadce0,inset_-1px_0_0_#dadce0,0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] z-10 relative'
        ]" 
      >
        <!-- Checkbox & Star -->
        <div class="flex items-center gap-3 text-gray-400 flex-shrink-0">
          <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer opacity-50 group-hover:opacity-100 transition-opacity" @click.stop />
          <button class="hover:text-gray-600 transition" @click.stop="toggleStar(msg)">
            <svg :class="['w-5 h-5', msg.starred ? 'text-yellow-400 fill-current' : 'text-gray-300']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </button>
        </div>

        <!-- Sender -->
        <div :class="['w-40 sm:w-48 truncate flex-shrink-0 text-sm', msg.read ? 'text-gray-600' : 'text-gray-900 font-bold']">
          {{ msg.sender }}
        </div>

        <!-- Subject & Snippet -->
        <div class="flex-1 truncate text-sm">
          <span :class="[msg.read ? 'text-gray-600' : 'text-gray-900 font-bold']">{{ msg.title }}</span>
          <span class="text-gray-400 mx-1">-</span>
          <span class="text-gray-500">{{ msg.content }}</span>
        </div>

        <!-- Date/Time -->
        <div :class="['w-20 text-right flex-shrink-0 text-xs sm:text-sm', msg.read ? 'text-gray-500' : 'text-gray-900 font-bold']">
          {{ msg.time }}
        </div>
      </div>
      
      <div v-if="messages.length === 0" class="p-8 text-center text-gray-500">
        Tidak ada pesan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '../composables/useToast'

const { addToast } = useToast()

const messages = ref([
  { 
    id: 1, 
    sender: 'PT Tech Jaya',
    title: 'Panggilan Interview - Frontend Developer', 
    content: 'Selamat siang, kami mengundang Anda untuk mengikuti sesi interview pada hari Senin besok melalui Zoom.', 
    time: '10:30', 
    read: false,
    starred: false
  },
  { 
    id: 2, 
    sender: 'JobForum System',
    title: 'Balasan Baru di Thread Anda', 
    content: 'Seseorang membalas thread "Tips mendapatkan kerja di perusahaan startup?". Buka forum untuk melihat balasan.', 
    time: '08:15', 
    read: false,
    starred: false
  },
  { 
    id: 3, 
    sender: 'Tim JobForum',
    title: 'Selamat Datang di JobForum!', 
    content: 'Terima kasih telah mendaftar. Jangan lupa lengkapi profil kamu agar peluang dilirik rekruter semakin besar dan profilmu lebih menarik.', 
    time: 'Kemarin', 
    read: true,
    starred: true
  },
  { 
    id: 4, 
    sender: 'PT Maju Mundur',
    title: 'Lamaran Ditolak', 
    content: 'Mohon maaf, kualifikasi Anda saat ini belum memenuhi kebutuhan kami. Jangan menyerah dan coba lagi di kesempatan lain!', 
    time: '2 Hari lalu', 
    read: true,
    starred: false
  },
])

const readMessage = (msg) => {
  if (msg.read) return
  
  msg.read = true
  // Memunculkan toast sebagai bukti fitur notifikasi tetap berjalan
  addToast(`Pesan dari ${msg.sender} ditandai sudah dibaca.`, 'success')
}

const toggleStar = (msg) => {
  msg.starred = !msg.starred
  if(msg.starred) {
    addToast('Pesan dibintangi', 'info')
  }
}
</script>