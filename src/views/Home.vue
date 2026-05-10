<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('Semua')

const categories = ['Semua', 'Teknologi', 'Desain', 'Marketing', 'Keuangan']

const jobs = ref([
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechVision Indonesia',
    location: 'Jakarta',
    salary: 'Rp 15-25 juta',
    type: 'Full-time',
    category: 'Teknologi',
    posted: '2 hari lalu',
    description: 'Mencari frontend developer berpengalaman untuk mengembangkan aplikasi web modern.',
    requirements: ['Vue.js/React', '2+ tahun pengalaman', 'TypeScript']
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'CreativeHub',
    location: 'Bandung',
    salary: 'Rp 12-18 juta',
    type: 'Full-time',
    category: 'Desain',
    posted: '3 hari lalu',
    description: 'Butuh desainer UI/UX kreatif untuk tim produk kami.',
    requirements: ['Figma', 'Adobe XD', 'Portfolio']
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    company: 'GrowFast Media',
    location: 'Surabaya',
    salary: 'Rp 8-15 juta',
    type: 'Part-time',
    category: 'Marketing',
    posted: '5 hari lalu',
    description: 'Tim kami mencari digital marketing specialist yang berpengalaman.',
    requirements: ['SEO', 'Google Ads', 'Social Media']
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'DataSolusi',
    location: 'Jakarta',
    salary: 'Rp 18-30 juta',
    type: 'Full-time',
    category: 'Teknologi',
    posted: '1 hari lalu',
    description: 'Bergabunglah dengan tim kami untuk mengembangkan backend sistem enterprise.',
    requirements: ['Node.js/Python', 'PostgreSQL', 'Cloud AWS']
  },
  {
    id: 5,
    title: 'Financial Analyst',
    company: 'InvestCorp Indonesia',
    location: 'Jakarta',
    salary: 'Rp 20-35 juta',
    type: 'Full-time',
    category: 'Keuangan',
    posted: '1 minggu lalu',
    description: 'Mencari financial analyst untuk menganalisis portofolio investasi.',
    requirements: ['Excel/SQL', 'Analisis data', 'CFA diutamakan']
  }
])

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Semua' || job.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const formatDate = (dateStr) => {
  return dateStr
}
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
      <h1 class="text-3xl font-bold mb-2">Temukan Pekerjaan Impianmu</h1>
      <p class="opacity-90 mb-6">Bergabung dengan ribuan profesional di platform kami</p>
      
      <div class="flex gap-4 flex-wrap">
        <div class="flex-1 min-w-[300px]">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Cari pekerjaan, perusahaan..."
            class="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <select 
          v-model="selectedCategory"
          class="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800">Lowongan Terbaru</h2>
      <span class="text-gray-500">{{ filteredJobs.length }} pekerjaan ditemukan</span>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink 
        v-for="job in filteredJobs" 
        :key="job.id" 
        :to="`/job/${job.id}`"
        class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 font-bold text-lg">{{ job.company[0] }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ job.posted }}</span>
        </div>
        
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ job.title }}</h3>
        <p class="text-gray-600 mb-3">{{ job.company }}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
            {{ job.location }}
          </span>
          <span class="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
            {{ job.type }}
          </span>
          <span class="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
            {{ job.category }}
          </span>
        </div>
        
        <div class="flex justify-between items-center pt-4 border-t border-gray-100">
          <span class="text-blue-600 font-semibold">{{ job.salary }}</span>
          <span class="text-gray-400 text-sm">Lihat detail →</span>
        </div>
      </RouterLink>
    </div>

    <div v-if="filteredJobs.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Tidak ada lowongan yang sesuai</p>
    </div>
  </div>
</template>