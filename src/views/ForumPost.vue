<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const newComment = ref('')

const comments = ref([
  { id: 1, author: 'SeniorDev', content: 'Good question! Saya mau kasih saran nih, fokus ke Array dan String dulu karena paling sering keluar.', createdAt: '1 jam lalu', likes: 8 },
  { id: 2, author: 'TechLead', content: 'Setuju, tapi jangan lupa juga graph traversal. BFS dan DFS sering banget ditanya di interview.', createdAt: '2 jam lalu', likes: 12 }
])

onMounted(() => {
  const postsData = {
    1: { title: 'Tips mendapatkan kerja di perusahaan startup?', content: 'Hai semuanya! Saya mau tanya nih, ada yang punya tips untuk bisa diterima di perusahaan startup? Terutama yang berkaitan dengan interview dan portfolio. Saya fresh graduate dan belum punya pengalaman kerja sama sekali. Terima kasih!', author: 'DevJunior', category: 'TipsInterview', createdAt: '2 jam lalu', likes: 24 },
    2: { title: 'Review: Bootcamp编程 vs Kuliah CS?', content: 'Mau tanya pendapat teman-teman. Lebih worth it mana belajar programming lewat bootcamp atau kuliah CS? Saya bingung mau mulai dari mana. Budget terbatas tapi mau dapat pengetahuan yang solid.', author: 'CodeNewbie', category: 'Karir', createdAt: '5 jam lalu', likes: 45 },
    3: { title: 'Struktur data mana yang paling penting untuk interview?', content: 'Lagi persiapin interview untuk posisi backend developer. Bagian mana sih yang paling sering ditanya? Array, tree, graph? Mohon sarannya!', author: 'BackendDev', category: 'Teknologi', createdAt: '1 hari lalu', likes: 67 },
    4: { title: 'Perbedaan Remote vs Hybrid work', content: 'Yang sudah berpengalaman, menurut kalian lebih prefer kerja remote atau hybrid? Apa keuntungan dan kekurangan masing-masing? Terutama untuk fresh graduate, mana yang lebih recommended?', author: 'WFHWarrior', category: 'Diskusi', createdAt: '2 hari lalu', likes: 89 },
    5: { title: 'Cara negotiassi gaji saat offer letter?', content: 'Baru dapat offer letter dari perusahaan, tapi salary nya masih di bawah ekspektasi. Gimana ya cara negotiassi yang baik? Ada yang bisa sharing pengalaman?', author: 'Negotiator', category: 'TipsInterview', createdAt: '3 hari lalu', likes: 112 }
  }
  
  post.value = postsData[parseInt(route.params.id)] || postsData[1]
})

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      id: comments.value.length + 1,
      author: 'User123',
      content: newComment.value,
      createdAt: 'Baru saja',
      likes: 0
    })
    newComment.value = ''
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button @click="router.push('/forum')" class="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2">
      ← Kembali ke Forum
    </button>

    <div v-if="post" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {{ post.category }}
          </span>
          <span class="text-gray-400 text-sm">{{ post.createdAt }}</span>
        </div>
        
        <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ post.title }}</h1>
        
        <div class="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-semibold">{{ post.author[0] }}</span>
          </div>
          <span class="text-gray-700 font-medium">{{ post.author }}</span>
        </div>
        
        <p class="text-gray-600 leading-relaxed text-lg mb-8">{{ post.content }}</p>
        
        <div class="flex items-center gap-4 mb-8">
          <button class="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition">
            <span>👍</span>
            <span>{{ post.likes }} suka</span>
          </button>
          <span class="text-gray-400">•</span>
          <span class="text-gray-500">{{ comments.length }} komentar</span>
        </div>
      </div>

      <div class="bg-gray-50 p-8">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Komentar</h2>
        
        <div class="space-y-4 mb-6">
          <div v-for="comment in comments" :key="comment.id" class="bg-white rounded-lg p-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-gray-600 text-sm font-medium">{{ comment.author[0] }}</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="font-medium text-gray-800">{{ comment.author }}</span>
                  <span class="text-gray-400 text-sm">{{ comment.createdAt }}</span>
                </div>
                <p class="text-gray-600">{{ comment.content }}</p>
                <button class="flex items-center gap-1 text-gray-400 hover:text-blue-600 text-sm mt-2">
                  <span>👍</span>
                  <span>{{ comment.likes }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4">
          <textarea 
            v-model="newComment"
            rows="3"
            placeholder="Tulis komentar..."
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          ></textarea>
          <div class="flex justify-end mt-3">
            <button 
              @click="addComment"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Kirim Komentar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>