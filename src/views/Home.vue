<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getCategoryClasses, getModeClasses, getTypeClasses, getCategoryButtonClasses } from '../composables/useHelpers'

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
    mode: 'Hybrid',
    category: 'Teknologi',
    posted: '2 hari lalu',
    applicants: 38,
    isFeatured: true,
    description: 'Bangun pengalaman web modern untuk produk digital yang dipakai ribuan pengguna setiap hari.',
    requirements: ['Vue.js', 'TypeScript', 'Design System']
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'CreativeHub',
    location: 'Bandung',
    salary: 'Rp 12-18 juta',
    type: 'Full-time',
    mode: 'Remote',
    category: 'Desain',
    posted: '3 hari lalu',
    applicants: 24,
    isFeatured: true,
    description: 'Rancang flow dan interface yang terasa bersih, jelas, dan efektif untuk produk consumer.',
    requirements: ['Figma', 'Design Thinking', 'Prototype']
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    company: 'GrowFast Media',
    location: 'Surabaya',
    salary: 'Rp 8-15 juta',
    type: 'Part-time',
    mode: 'Remote',
    category: 'Marketing',
    posted: '5 hari lalu',
    applicants: 19,
    isFeatured: false,
    description: 'Kelola campaign lintas channel dan optimalkan performa akuisisi dengan pendekatan data.',
    requirements: ['SEO', 'Google Ads', 'Analytics']
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'DataSolusi',
    location: 'Jakarta',
    salary: 'Rp 18-30 juta',
    type: 'Full-time',
    mode: 'On-site',
    category: 'Teknologi',
    posted: '1 hari lalu',
    applicants: 42,
    isFeatured: true,
    description: 'Kembangkan fondasi backend yang stabil untuk sistem enterprise dan integrasi multi layanan.',
    requirements: ['Node.js', 'PostgreSQL', 'Cloud AWS']
  },
  {
    id: 5,
    title: 'Financial Analyst',
    company: 'InvestCorp Indonesia',
    location: 'Jakarta',
    salary: 'Rp 20-35 juta',
    type: 'Full-time',
    mode: 'Hybrid',
    category: 'Keuangan',
    posted: '1 minggu lalu',
    applicants: 16,
    isFeatured: false,
    description: 'Analisis portofolio, siapkan insight bisnis, dan bantu tim mengambil keputusan yang presisi.',
    requirements: ['Excel', 'SQL', 'Financial Modeling']
  }
])

const platformHighlights = [
  {
    title: 'Pencarian lebih terarah',
    description: 'Cari posisi berdasarkan judul, perusahaan, lokasi, dan skill utama dalam satu input.'
  },
  {
    title: 'Lowongan yang mudah dipindai',
    description: 'Informasi penting seperti tipe kerja, salary, dan skill utama ditampilkan lebih ringkas.'
  },
  {
    title: 'Terhubung dengan komunitas',
    description: 'Lanjutkan pencarian ke forum dan grup chat saat butuh insight sebelum melamar.'
  }
]

const supportLinks = [
  { title: 'Diskusi karier', description: 'Lihat pengalaman interview dan tips negosiasi dari komunitas.', to: '/forum' },
  { title: 'Grup chat aktif', description: 'Masuk ke obrolan cepat untuk tanya jawab yang lebih santai.', to: '/chat' },
  { title: 'Bangun profil', description: 'Siapkan akun agar aktivitas melamar terasa lebih praktis.', to: '/register' }
]

const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return jobs.value.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.category,
      job.mode,
      ...job.requirements
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch = query === '' || searchableText.includes(query)
    const matchesCategory = selectedCategory.value === 'Semua' || job.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

const activeCompanies = computed(() => {
  return new Set(jobs.value.map((job) => job.company)).size
})

const popularCategory = computed(() => {
  const categoryCount = jobs.value.reduce((acc, job) => {
    acc[job.category] = (acc[job.category] || 0) + 1
    return acc
  }, {})

  return Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Teknologi'
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedCategory.value !== 'Semua'
})

const spotlightJob = computed(() => {
  return filteredJobs.value[0] || jobs.value[0] || null
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Semua'
}


</script>

<template>
  <div class="space-y-10">
    <section class="relative overflow-hidden rounded-[32px] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#f8fbff_100%)] px-6 py-8 shadow-[0_30px_80px_-50px_rgba(37,99,235,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div class="absolute inset-x-0 top-0 h-44 bg-gradient-to-r from-blue-100 via-sky-50 to-white"></div>
      <div class="absolute -left-16 top-10 h-40 w-40 rounded-full bg-blue-200/45 blur-3xl"></div>
      <div class="absolute right-0 top-20 h-52 w-52 rounded-full bg-sky-200/35 blur-3xl"></div>

      <div class="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <span class="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-1 text-sm font-semibold text-blue-700 shadow-sm">
            Career discovery hub
          </span>

          <h1 class="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Cari pekerjaan dengan tampilan yang lebih modern, ringkas, dan enak dipakai.
          </h1>

          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Halaman utama ini dirapikan supaya proses mencari peluang kerja terasa lebih cepat, lebih fokus, dan lebih jelas dari pandangan pertama.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <RouterLink
              to="/register"
              class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Buat akun gratis
            </RouterLink>
            <RouterLink
              to="/forum"
              class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Lihat forum diskusi
            </RouterLink>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ jobs.length }}+</p>
              <p class="mt-1 text-sm text-slate-600">Lowongan aktif</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ activeCompanies }}+</p>
              <p class="mt-1 text-sm text-slate-600">Perusahaan aktif</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ popularCategory }}</p>
              <p class="mt-1 text-sm text-slate-600">Kategori terpopuler</p>
            </div>
          </div>

          <div class="mt-8 rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.3)] backdrop-blur sm:p-5">
            <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Cari posisi, perusahaan, lokasi, atau skill</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Contoh: frontend, Jakarta, Figma, SQL"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <RouterLink
                to="/login"
                class="inline-flex h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Masuk untuk melamar
              </RouterLink>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                class="rounded-full border px-4 py-2 text-sm font-medium transition"
                :class="getCategoryButtonClasses(selectedCategory, category)"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{{ filteredJobs.length }} hasil cocok dengan pencarian saat ini</span>
              <button
                v-if="hasActiveFilters"
                type="button"
                class="font-semibold text-blue-600 transition hover:text-blue-700"
                @click="resetFilters"
              >
                Reset filter
              </button>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[28px] border border-white/80 bg-slate-900 p-6 text-white shadow-[0_24px_50px_-36px_rgba(15,23,42,0.8)]">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Ringkasan hari ini</p>
            <h2 class="mt-3 text-2xl font-bold">Tampilan yang lebih fokus untuk pengambilan keputusan yang cepat.</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Elemen utama diprioritaskan agar user lebih cepat memahami lowongan tanpa harus memindai terlalu banyak detail sekunder.
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-sm text-slate-300">Lowongan pilihan</p>
                <p class="mt-1 text-xl font-semibold text-white">{{ filteredJobs.filter((job) => job.isFeatured).length || 1 }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-sm text-slate-300">Peran paling dicari</p>
                <p class="mt-1 text-xl font-semibold text-white">{{ popularCategory }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Kenapa lebih nyaman</p>
            <div class="mt-4 space-y-4">
              <article
                v-for="item in platformHighlights"
                :key="item.title"
                class="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
              >
                <h3 class="text-base font-semibold text-slate-900">{{ item.title }}</h3>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.description }}</p>
              </article>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
      <div>
        <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Lowongan terbaru</p>
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">Pilihan kerja yang tampil lebih jelas dan lebih mudah dipindai.</h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Setiap kartu menampilkan informasi penting lebih dulu: peran, perusahaan, mode kerja, salary, dan skill utama.
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <p class="font-semibold text-slate-900">{{ filteredJobs.length }} pekerjaan ditemukan</p>
            <p v-if="selectedCategory !== 'Semua'" class="mt-1">Filter aktif: {{ selectedCategory }}</p>
            <p v-else class="mt-1">Menampilkan seluruh kategori pekerjaan</p>
          </div>
        </div>

        <div v-if="filteredJobs.length > 0" class="grid gap-5 md:grid-cols-2">
          <RouterLink
            v-for="job in filteredJobs"
            :key="job.id"
            :to="`/job/${job.id}`"
            class="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_-40px_rgba(37,99,235,0.45)]"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                  {{ job.company[0] }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">{{ job.company }}</p>
                  <p class="text-sm text-slate-500">{{ job.location }}</p>
                </div>
              </div>

              <span
                v-if="job.isFeatured"
                class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                Pilihan
              </span>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-semibold tracking-tight text-slate-900 transition group-hover:text-blue-700">
                {{ job.title }}
              </h3>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                {{ job.description }}
              </p>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                class="rounded-full border px-3 py-1 text-xs font-semibold"
                :class="getCategoryClasses(job.category)"
              >
                {{ job.category }}
              </span>
              <span
                class="rounded-full border px-3 py-1 text-xs font-semibold"
                :class="getTypeClasses(job.type)"
              >
                {{ job.type }}
              </span>
              <span
                class="rounded-full border px-3 py-1 text-xs font-semibold"
                :class="getModeClasses(job.mode)"
              >
                {{ job.mode }}
              </span>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="requirement in job.requirements"
                :key="requirement"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {{ requirement }}
              </span>
            </div>

            <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p class="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Salary</p>
                <p class="mt-1 text-base font-semibold text-blue-700">{{ job.salary }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-700">{{ job.posted }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ job.applicants }} pelamar</p>
              </div>
            </div>
          </RouterLink>
        </div>

        <div
          v-else
          class="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm"
        >
          <h3 class="text-xl font-semibold text-slate-900">Belum ada hasil yang sesuai</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Coba ubah kata kunci atau pilih kategori lain agar hasil pencarian lebih luas.
          </p>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              @click="resetFilters"
            >
              Reset filter
            </button>
            <RouterLink
              to="/forum"
              class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Buka forum diskusi
            </RouterLink>
          </div>
        </div>
      </div>

      <aside class="space-y-5">
        <div
          v-if="spotlightJob"
          class="rounded-[28px] border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Spotlight</p>
          <h3 class="mt-3 text-2xl font-bold tracking-tight text-slate-900">{{ spotlightJob.title }}</h3>
          <p class="mt-2 text-sm font-medium text-slate-600">{{ spotlightJob.company }} · {{ spotlightJob.location }}</p>
          <p class="mt-4 text-sm leading-6 text-slate-600">
            {{ spotlightJob.description }}
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              class="rounded-full border px-3 py-1 text-xs font-semibold"
              :class="getModeClasses(spotlightJob.mode)"
            >
              {{ spotlightJob.mode }}
            </span>
            <span
              class="rounded-full border px-3 py-1 text-xs font-semibold"
              :class="getCategoryClasses(spotlightJob.category)"
            >
              {{ spotlightJob.category }}
            </span>
          </div>

          <RouterLink
            :to="`/job/${spotlightJob.id}`"
            class="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Lihat detail lowongan
          </RouterLink>
        </div>

        <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Langkah cepat</p>
          <div class="mt-4 space-y-4">
            <RouterLink
              v-for="item in supportLinks"
              :key="item.title"
              :to="item.to"
              class="block rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-slate-200 hover:bg-white"
            >
              <h3 class="text-base font-semibold text-slate-900">{{ item.title }}</h3>
              <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.description }}</p>
            </RouterLink>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>
