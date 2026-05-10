<script setup>
import { ref, computed } from 'vue'

const showCreateModal = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('Semua')

const newPost = ref({
  title: '',
  content: '',
  category: 'Teknologi',
  author: 'User123'
})

const categories = ['Semua', 'Teknologi', 'Karir', 'TipsInterview', 'Diskusi']

const posts = ref([
  {
    id: 1,
    title: 'Tips mendapatkan kerja di perusahaan startup?',
    content: 'Hai semuanya! Saya mau tanya nih, ada yang punya tips untuk bisa diterima di perusahaan startup? Terutama yang berkaitan dengan interview dan portfolio. Terima kasih!',
    author: 'DevJunior',
    category: 'TipsInterview',
    createdAt: '2 jam lalu',
    likes: 24,
    comments: 12
  },
  {
    id: 2,
    title: 'Review: Bootcamp编程 vs Kuliah CS?',
    content: 'Mau tanya pendapat teman-teman. Lebih worth it mana belajar programming lewat bootcamp atau kuliah CS? Saya bingung mau mulai dari mana.',
    author: 'CodeNewbie',
    category: 'Karir',
    createdAt: '5 jam lalu',
    likes: 45,
    comments: 28
  },
  {
    id: 3,
    title: 'Struktur data mana yang paling penting untuk interview?',
    content: 'Lagi persiapin interview untuk posisi backend developer. Bagian mana sih yang paling sering ditanya? Array, tree, graph? Mohon sarannya!',
    author: 'BackendDev',
    category: 'Teknologi',
    createdAt: '1 hari lalu',
    likes: 67,
    comments: 34
  },
  {
    id: 4,
    title: 'Perbedaan Remote vs Hybrid work',
    content: 'Yang sudah berpengalaman, menurut kalian lebih prefer kerja remote atau hybrid? Apa keuntungan dan kekurangan masing-masing?',
    author: 'WFHWarrior',
    category: 'Diskusi',
    createdAt: '2 hari lalu',
    likes: 89,
    comments: 56
  },
  {
    id: 5,
    title: 'Cara negotiassi gaji saat offer letter?',
    content: 'Baru dapat offer letter dari perusahaan, tapi salary nya masih di bawah ekspektasi. Gimana ya cara negotiassi yang baik? Ada yang bisa sharing pengalaman?',
    author: 'Negotiator',
    category: 'TipsInterview',
    createdAt: '3 hari lalu',
    likes: 112,
    comments: 67
  }
])

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Semua' || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const createPost = () => {
  if (newPost.value.title && newPost.value.content) {
    const post = {
      id: posts.value.length + 1,
      ...newPost.value,
      createdAt: 'Baru saja',
      likes: 0,
      comments: 0
    }
    posts.value.unshift(post)
    showCreateModal.value = false
    newPost.value = { title: '', content: '', category: 'Teknologi', author: 'User123' }
  }
}

const likePost = (post) => {
  post.likes++
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Forum Diskusi</h1>
        <p class="text-gray-500">Bagikan pengetahuan dan diskusi bareng</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
      >
        <span class="text-xl">+</span>
        Buat Postingan
      </button>
    </div>

    <div class="flex gap-4 mb-6">
      <div class="flex-1">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Cari topik diskusi..."
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <select 
        v-model="selectedCategory"
        class="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="space-y-4">
      <RouterLink 
        v-for="post in filteredPosts" 
        :key="post.id" 
        :to="`/forum/${post.id}`"
        class="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                {{ post.category }}
              </span>
              <span class="text-gray-400 text-sm">{{ post.createdAt }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ post.title }}</h3>
            <p class="text-gray-600 line-clamp-2 mb-4">{{ post.content }}</p>
            <div class="flex items-center gap-4">
              <span class="text-gray-500 text-sm flex items-center gap-1">
                <span class="text-blue-600">👤</span>
                {{ post.author }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
          <button @click.prevent="likePost(post)" class="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition">
            <span>👍</span>
            <span>{{ post.likes }}</span>
          </button>
          <span class="flex items-center gap-2 text-gray-500">
            <span>💬</span>
            <span>{{ post.comments }} komentar</span>
          </span>
        </div>
      </RouterLink>
    </div>

    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <p class="text-gray-500">Tidak ada postingan yang sesuai</p>
    </div>

    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-xl font-bold text-gray-800">Buat Postingan Baru</h2>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
              <input 
                v-model="newPost.title"
                type="text"
                placeholder="Judul diskusi..."
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select 
                v-model="newPost.category"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option v-for="cat in categories.slice(1)" :key="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Konten</label>
              <textarea 
                v-model="newPost.content"
                rows="6"
                placeholder="Tulis pertanyaan atau topik diskusi kamu..."
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              ></textarea>
            </div>
          </div>
          <div class="p-6 border-t border-gray-100 flex justify-end gap-4">
            <button 
              @click="showCreateModal = false"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button 
              @click="createPost"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Publikasikan
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>