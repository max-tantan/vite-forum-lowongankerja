<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const job = ref({
  id: 1,
  title: 'Frontend Developer',
  company: 'TechVision Indonesia',
  location: 'Jakarta',
  salary: 'Rp 15-25 juta',
  type: 'Full-time',
  category: 'Teknologi',
  posted: '2 hari lalu',
  description: 'Mencari frontend developer berpengalaman untuk mengembangkan aplikasi web modern menggunakan Vue.js atau React. Anda akan bekerja sama dengan tim designer dan backend developer untuk menciptakan user experience yang luar biasa.',
  requirements: ['Vue.js/React', '2+ tahun pengalaman', 'TypeScript', 'Git', 'REST API'],
  benefits: ['Gaji kompetitif', 'Asuransi kesehatan', 'Flexible working hours', 'Learning budget'],
  contact: 'hr@techvision.id'
})

onMounted(() => {
  const jobId = parseInt(route.params.id)
  const jobsData = {
    1: { title: 'Frontend Developer', company: 'TechVision Indonesia', location: 'Jakarta', salary: 'Rp 15-25 juta', type: 'Full-time', category: 'Teknologi', posted: '2 hari lalu', description: 'Mencari frontend developer berpengalaman untuk mengembangkan aplikasi web modern menggunakan Vue.js atau React.', requirements: ['Vue.js/React', '2+ tahun pengalaman', 'TypeScript', 'Git', 'REST API'], benefits: ['Gaji kompetitif', 'Asuransi kesehatan', 'Flexible working hours'], contact: 'hr@techvision.id' },
    2: { title: 'UI/UX Designer', company: 'CreativeHub', location: 'Bandung', salary: 'Rp 12-18 juta', type: 'Full-time', category: 'Desain', posted: '3 hari lalu', description: 'Butuh desainer UI/UX kreatif untuk tim produk kami.', requirements: ['Figma', 'Adobe XD', 'Portfolio'], benefits: ['Creative environment', 'Team activities'], contact: 'design@creativehub.com' },
    3: { title: 'Digital Marketing Specialist', company: 'GrowFast Media', location: 'Surabaya', salary: 'Rp 8-15 juta', type: 'Part-time', category: 'Marketing', posted: '5 hari lalu', description: 'Tim kami mencari digital marketing specialist yang berpengalaman.', requirements: ['SEO', 'Google Ads', 'Social Media'], benefits: ['Flexible hours', 'Performance bonus'], contact: 'career@growfast.com' },
    4: { title: 'Backend Developer', company: 'DataSolusi', location: 'Jakarta', salary: 'Rp 18-30 juta', type: 'Full-time', category: 'Teknologi', posted: '1 hari lalu', description: 'Bergabunglah dengan tim kami untuk mengembangkan backend sistem enterprise.', requirements: ['Node.js/Python', 'PostgreSQL', 'Cloud AWS'], benefits: ['Remote option', 'Stock options'], contact: 'hr@datasolusi.co.id' },
    5: { title: 'Financial Analyst', company: 'InvestCorp Indonesia', location: 'Jakarta', salary: 'Rp 20-35 juta', type: 'Full-time', category: 'Keuangan', posted: '1 minggu lalu', description: 'Mencari financial analyst untuk menganalisis portofolio investasi.', requirements: ['Excel/SQL', 'Analisis data', 'CFA diutamakan'], benefits: ['Bonus besar', 'Karir berkembang'], contact: 'recruitment@investcorp.co.id' }
  }
  
  if (jobsData[jobId]) {
    job.value = { ...job.value, ...jobsData[jobId], id: jobId }
  }
})

const applyNow = () => {
  alert(`Melamar untuk posisi ${job.value.title} di ${job.value.company}`)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button @click="router.back()" class="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2">
      ← Kembali
    </button>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <span class="text-2xl font-bold">{{ job.company[0] }}</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ job.title }}</h1>
            <p class="text-lg opacity-90">{{ job.company }}</p>
            <div class="flex gap-3 mt-4">
              <span class="px-3 py-1 bg-white/20 rounded-full text-sm">{{ job.location }}</span>
              <span class="px-3 py-1 bg-white/20 rounded-full text-sm">{{ job.type }}</span>
              <span class="px-3 py-1 bg-white/20 rounded-full text-sm">{{ job.salary }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Deskripsi Pekerjaan</h2>
          <p class="text-gray-600 leading-relaxed">{{ job.description }}</p>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Persyaratan</h2>
          <ul class="space-y-2">
            <li v-for="req in job.requirements" :key="req" class="flex items-center gap-3 text-gray-600">
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              {{ req }}
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Benefit</h2>
          <div class="flex flex-wrap gap-3">
            <span v-for="benefit in job.benefits" :key="benefit" class="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm">
              {{ benefit }}
            </span>
          </div>
        </div>

        <div class="flex gap-4 pt-6 border-t border-gray-100">
          <button @click="applyNow" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            Lamar Sekarang
          </button>
          <button class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>