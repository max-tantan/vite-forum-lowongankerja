<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const jobsData = {
  1: {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechVision Indonesia',
    location: 'Jakarta',
    salary: 'Rp 15-25 juta',
    type: 'Full-time',
    mode: 'Hybrid',
    category: 'Teknologi',
    posted: 'Diposting 2 hari lalu',
    deadline: 'Tutup pada 24 Mei 2026',
    applicants: 38,
    description:
      'TechVision mencari Frontend Developer yang nyaman bekerja dekat dengan tim produk, design, dan backend. Fokus utamanya adalah membangun pengalaman web yang cepat, konsisten, dan terasa premium untuk produk yang digunakan ribuan user setiap hari.',
    summary:
      'Peran ini cocok untuk kandidat yang ingin mengerjakan UI modern, memperkuat fondasi design system, dan aktif terlibat dalam diskusi produk.',
    responsibilities: [
      'Membangun halaman dan komponen frontend yang scalable dengan fokus pada performa dan aksesibilitas.',
      'Berkolaborasi dengan designer untuk menerjemahkan kebutuhan produk menjadi UI yang rapi dan konsisten.',
      'Menjaga kualitas codebase melalui code review, testing dasar, dan perbaikan bug prioritas.'
    ],
    requirements: ['Vue.js/React', '2+ tahun pengalaman', 'TypeScript', 'Git', 'REST API'],
    preferred: ['Pengalaman dengan design system', 'Pernah optimasi performance web', 'Terbiasa kolaborasi lintas fungsi'],
    benefits: ['Asuransi kesehatan', 'Hybrid working', 'Learning budget', 'Bonus performa'],
    stages: [
      { title: 'Screening CV', description: 'Tim recruiter meninjau CV dan portfolio dalam 2-3 hari kerja.' },
      { title: 'Interview HR Online', description: 'Sesi 30 menit untuk membahas motivasi, pengalaman, dan ekspektasi kandidat.' },
      { title: 'Interview Teknis', description: 'Diskusi teknis online dengan engineer dan product team.' },
      { title: 'Final Review', description: 'Penyesuaian offer dan diskusi kesiapan bergabung.' }
    ],
    interviewSlots: [
      { id: 'tv-1', label: 'Selasa, 12 Mei 2026 · 10:00 WIB', host: 'Google Meet', duration: '30 menit' },
      { id: 'tv-2', label: 'Rabu, 13 Mei 2026 · 14:00 WIB', host: 'Google Meet', duration: '30 menit' },
      { id: 'tv-3', label: 'Kamis, 14 Mei 2026 · 16:00 WIB', host: 'Google Meet', duration: '30 menit' }
    ],
    recruiter: {
      name: 'Nadia Pratama',
      role: 'Talent Acquisition',
      email: 'hr@techvision.id'
    },
    companySummary:
      'TechVision Indonesia adalah perusahaan produk digital yang fokus pada tools kolaborasi dan dashboard operasional untuk bisnis modern.',
    documents: ['CV dalam format PDF', 'Portfolio atau link project', 'Ringkasan pengalaman singkat']
  },
  2: {
    id: 2,
    title: 'UI/UX Designer',
    company: 'CreativeHub',
    location: 'Bandung',
    salary: 'Rp 12-18 juta',
    type: 'Full-time',
    mode: 'Remote',
    category: 'Desain',
    posted: 'Diposting 3 hari lalu',
    deadline: 'Tutup pada 26 Mei 2026',
    applicants: 24,
    description:
      'CreativeHub mencari UI/UX Designer untuk membantu tim produk membentuk pengalaman digital yang rapi, mudah dipahami, dan konsisten lintas platform.',
    summary:
      'Posisi ini ideal untuk kandidat yang ingin fokus pada product thinking, visual refinement, dan komunikasi desain yang jelas.',
    responsibilities: [
      'Menerjemahkan brief produk menjadi wireframe, flow, dan prototype yang mudah diuji.',
      'Menyiapkan komponen visual dan guideline desain yang konsisten untuk tim product dan engineer.',
      'Terlibat dalam validasi ide melalui usability check dan iterasi berbasis feedback.'
    ],
    requirements: ['Figma', 'Adobe XD', 'Portfolio', 'User Flow', 'Prototype'],
    preferred: ['Paham design handoff', 'Punya studi kasus UX', 'Tertarik dengan design system'],
    benefits: ['Remote setup support', 'Creative environment', 'Quarterly retreat', 'Design budget'],
    stages: [
      { title: 'Portfolio Review', description: 'Tim design menilai kualitas studi kasus, visual hierarchy, dan proses berpikir.' },
      { title: 'Online Interview', description: 'Sesi 45 menit untuk membahas pengalaman design dan kolaborasi tim.' },
      { title: 'Case Discussion', description: 'Presentasi ringan terkait pendekatan desain pada sebuah problem produk.' },
      { title: 'Offer Stage', description: 'Penyesuaian kompensasi dan jadwal onboarding.' }
    ],
    interviewSlots: [
      { id: 'ch-1', label: 'Rabu, 13 Mei 2026 · 11:00 WIB', host: 'Zoom', duration: '45 menit' },
      { id: 'ch-2', label: 'Kamis, 14 Mei 2026 · 13:30 WIB', host: 'Zoom', duration: '45 menit' },
      { id: 'ch-3', label: 'Jumat, 15 Mei 2026 · 15:00 WIB', host: 'Zoom', duration: '45 menit' }
    ],
    recruiter: {
      name: 'Salsa Adeline',
      role: 'Design Recruiter',
      email: 'design@creativehub.com'
    },
    companySummary:
      'CreativeHub adalah studio produk dan brand experience yang bekerja dengan startup dan perusahaan consumer di Asia Tenggara.',
    documents: ['CV PDF', 'Portfolio utama', 'Link Behance/Dribbble bila ada']
  },
  3: {
    id: 3,
    title: 'Digital Marketing Specialist',
    company: 'GrowFast Media',
    location: 'Surabaya',
    salary: 'Rp 8-15 juta',
    type: 'Part-time',
    mode: 'Remote',
    category: 'Marketing',
    posted: 'Diposting 5 hari lalu',
    deadline: 'Tutup pada 28 Mei 2026',
    applicants: 19,
    description:
      'GrowFast Media membutuhkan Digital Marketing Specialist yang nyaman bekerja dengan data campaign, funnel acquisition, dan optimasi channel utama.',
    summary:
      'Peran ini lebih cocok untuk kandidat yang ingin mengelola campaign sambil tetap dekat dengan analitik dan eksperimen.',
    responsibilities: [
      'Menyiapkan dan menjalankan campaign digital lintas channel dengan target performa yang jelas.',
      'Menganalisis hasil campaign dan mengusulkan optimasi berdasarkan data.',
      'Berkoordinasi dengan tim konten dan design untuk menjaga kualitas materi kampanye.'
    ],
    requirements: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
    preferred: ['Pernah handle paid ads', 'Paham funnel conversion', 'Nyaman presentasi insight'],
    benefits: ['Remote part-time', 'Performance bonus', 'Flexible hours', 'Mentoring session'],
    stages: [
      { title: 'CV Review', description: 'Pemeriksaan CV dan pengalaman campaign sebelumnya.' },
      { title: 'Interview Online', description: 'Pembahasan strategi channel dan pengalaman optimasi.' },
      { title: 'Mini Assignment', description: 'Simulasi ringan untuk melihat pendekatan analisis campaign.' },
      { title: 'Offer', description: 'Negosiasi scope kerja dan kompensasi.' }
    ],
    interviewSlots: [
      { id: 'gf-1', label: 'Kamis, 14 Mei 2026 · 10:30 WIB', host: 'Google Meet', duration: '40 menit' },
      { id: 'gf-2', label: 'Jumat, 15 Mei 2026 · 14:30 WIB', host: 'Google Meet', duration: '40 menit' }
    ],
    recruiter: {
      name: 'Raka Hidayat',
      role: 'Hiring Partner',
      email: 'career@growfast.com'
    },
    companySummary:
      'GrowFast Media membantu brand dan bisnis digital meningkatkan acquisition melalui strategi campaign berbasis data.',
    documents: ['CV PDF', 'Ringkasan campaign utama', 'Link portofolio atau case study']
  },
  4: {
    id: 4,
    title: 'Backend Developer',
    company: 'DataSolusi',
    location: 'Jakarta',
    salary: 'Rp 18-30 juta',
    type: 'Full-time',
    mode: 'On-site',
    category: 'Teknologi',
    posted: 'Diposting 1 hari lalu',
    deadline: 'Tutup pada 22 Mei 2026',
    applicants: 42,
    description:
      'DataSolusi mencari Backend Developer untuk memperkuat service architecture, data handling, dan integrasi sistem enterprise yang sedang berkembang.',
    summary:
      'Posisi ini tepat untuk engineer yang suka membangun fondasi teknis yang kuat dan menjaga reliability service.',
    responsibilities: [
      'Mengembangkan service backend dan API yang stabil untuk kebutuhan produk dan operasional internal.',
      'Bekerja sama dengan frontend dan product untuk memastikan integrasi fitur berjalan mulus.',
      'Mengoptimasi query, struktur data, dan monitoring dasar pada service utama.'
    ],
    requirements: ['Node.js/Python', 'PostgreSQL', 'Cloud AWS', 'REST API', 'System Design dasar'],
    preferred: ['Pengalaman dengan queue system', 'Terbiasa debug production issue', 'Paham observability'],
    benefits: ['Asuransi premium', 'Makan siang kantor', 'Stock options', 'Technical mentoring'],
    stages: [
      { title: 'CV Screening', description: 'Review pengalaman teknis dan scope project yang pernah ditangani.' },
      { title: 'Online Intro Call', description: 'Sesi awal bersama recruiter untuk membahas motivasi dan ekspektasi.' },
      { title: 'Technical Interview', description: 'Diskusi mendalam seputar API, database, dan problem solving.' },
      { title: 'Final Meeting', description: 'Pertemuan akhir dengan engineering manager.' }
    ],
    interviewSlots: [
      { id: 'ds-1', label: 'Senin, 11 Mei 2026 · 13:00 WIB', host: 'Zoom', duration: '30 menit' },
      { id: 'ds-2', label: 'Selasa, 12 Mei 2026 · 15:30 WIB', host: 'Zoom', duration: '30 menit' },
      { id: 'ds-3', label: 'Rabu, 13 Mei 2026 · 11:30 WIB', host: 'Zoom', duration: '30 menit' }
    ],
    recruiter: {
      name: 'Ayu Maharani',
      role: 'Technical Recruiter',
      email: 'hr@datasolusi.co.id'
    },
    companySummary:
      'DataSolusi membangun solusi data dan backend enterprise untuk perusahaan yang membutuhkan sistem operasional yang andal.',
    documents: ['CV PDF', 'Github atau project sample', 'Ringkasan pengalaman backend']
  },
  5: {
    id: 5,
    title: 'Financial Analyst',
    company: 'InvestCorp Indonesia',
    location: 'Jakarta',
    salary: 'Rp 20-35 juta',
    type: 'Full-time',
    mode: 'Hybrid',
    category: 'Keuangan',
    posted: 'Diposting 1 minggu lalu',
    deadline: 'Tutup pada 30 Mei 2026',
    applicants: 16,
    description:
      'InvestCorp membuka posisi Financial Analyst untuk mendukung analisis portofolio, forecasting, dan pelaporan kinerja investasi secara berkala.',
    summary:
      'Peran ini cocok untuk kandidat yang teliti, nyaman bekerja dengan data finansial, dan mampu menyusun insight bisnis yang jelas.',
    responsibilities: [
      'Menganalisis performa portofolio dan menyiapkan laporan berkala untuk stakeholder internal.',
      'Membantu proses forecasting, budgeting, dan evaluasi peluang investasi baru.',
      'Berkolaborasi dengan tim finance dan strategy untuk mengubah data menjadi insight yang bisa ditindaklanjuti.'
    ],
    requirements: ['Excel/SQL', 'Analisis data', 'Financial Modeling', 'Presentasi insight'],
    preferred: ['Pengalaman di investment firm', 'CFA level 1+', 'Paham dashboard reporting'],
    benefits: ['Bonus tahunan', 'Hybrid policy', 'Medical coverage', 'Career path jelas'],
    stages: [
      { title: 'Document Review', description: 'Evaluasi CV, pengalaman analisis, dan latar belakang industri.' },
      { title: 'Interview Online', description: 'Diskusi pengalaman kerja, analytical thinking, dan komunikasi insight.' },
      { title: 'Case Review', description: 'Pembahasan singkat studi kasus finansial.' },
      { title: 'Offer Discussion', description: 'Finalisasi benefit dan tanggal mulai kerja.' }
    ],
    interviewSlots: [
      { id: 'ic-1', label: 'Kamis, 14 Mei 2026 · 09:30 WIB', host: 'Microsoft Teams', duration: '45 menit' },
      { id: 'ic-2', label: 'Jumat, 15 Mei 2026 · 11:00 WIB', host: 'Microsoft Teams', duration: '45 menit' }
    ],
    recruiter: {
      name: 'Kevin Wijaya',
      role: 'Corporate Recruiter',
      email: 'recruitment@investcorp.co.id'
    },
    companySummary:
      'InvestCorp Indonesia adalah perusahaan investasi yang fokus pada pengelolaan portofolio dan analisis peluang bisnis jangka menengah hingga panjang.',
    documents: ['CV PDF', 'Ringkasan analisis atau project', 'Cover note singkat']
  }
}

const job = computed(() => {
  return jobsData[Number(route.params.id)] || null
})

const selectedSlotId = ref('')
const cvInput = ref(null)
const applicationForm = ref({
  fullName: '',
  email: '',
  phone: '',
  portfolioUrl: '',
  expectedSalary: '',
  notes: '',
  agreeToProcess: false
})
const uploadedCv = ref(null)
const uploadError = ref('')
const submitError = ref('')
const applicationSuccess = ref(null)

const selectedSlot = computed(() => {
  if (!job.value) {
    return null
  }

  return job.value.interviewSlots.find((slot) => slot.id === selectedSlotId.value) || null
})

const canSubmit = computed(() => {
  return (
    job.value &&
    applicationForm.value.fullName.trim() !== '' &&
    applicationForm.value.email.trim() !== '' &&
    applicationForm.value.phone.trim() !== '' &&
    uploadedCv.value &&
    selectedSlotId.value !== '' &&
    applicationForm.value.agreeToProcess
  )
})

const getCategoryClasses = (category) => {
  const tones = {
    Teknologi: 'border-blue-100 bg-blue-50 text-blue-700',
    Desain: 'border-amber-100 bg-amber-50 text-amber-700',
    Marketing: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    Keuangan: 'border-slate-200 bg-slate-100 text-slate-700'
  }

  return tones[category] || 'border-slate-200 bg-slate-100 text-slate-700'
}

const getModeClasses = (mode) => {
  const tones = {
    Remote: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    Hybrid: 'border-sky-100 bg-sky-50 text-sky-700',
    'On-site': 'border-orange-100 bg-orange-50 text-orange-700'
  }

  return tones[mode] || 'border-slate-200 bg-slate-100 text-slate-700'
}

const handleCvChange = (event) => {
  const [file] = event.target.files || []

  uploadError.value = ''
  applicationSuccess.value = null

  if (!file) {
    uploadedCv.value = null
    return
  }

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  const maxSizeInBytes = 5 * 1024 * 1024

  if (!isPdf) {
    uploadedCv.value = null
    uploadError.value = 'CV harus dalam format PDF.'
    event.target.value = ''
    return
  }

  if (file.size > maxSizeInBytes) {
    uploadedCv.value = null
    uploadError.value = 'Ukuran file maksimal 5 MB.'
    event.target.value = ''
    return
  }

  uploadedCv.value = {
    name: file.name,
    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
  }
}

const resetForm = () => {
  applicationForm.value = {
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    expectedSalary: '',
    notes: '',
    agreeToProcess: false
  }
  selectedSlotId.value = ''
  uploadedCv.value = null
  uploadError.value = ''
  submitError.value = ''

  if (cvInput.value) {
    cvInput.value.value = ''
  }
}

const submitApplication = () => {
  submitError.value = ''
  applicationSuccess.value = null

  if (!canSubmit.value) {
    submitError.value = 'Lengkapi data utama, upload CV PDF, dan pilih slot interview online terlebih dahulu.'
    return
  }

  applicationSuccess.value = {
    applicantName: applicationForm.value.fullName,
    slotLabel: selectedSlot.value?.label || '-',
    slotHost: selectedSlot.value?.host || '-',
    cvName: uploadedCv.value?.name || '-',
    recruiterName: job.value.recruiter.name
  }

  resetForm()
}
</script>

<template>
  <div v-if="job" class="mx-auto max-w-7xl space-y-8">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      @click="router.back()"
    >
      Kembali ke daftar lowongan
    </button>

    <section class="relative overflow-hidden rounded-[32px] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#f8fbff_100%)] px-6 py-8 shadow-[0_30px_80px_-50px_rgba(37,99,235,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div class="absolute inset-x-0 top-0 h-44 bg-gradient-to-r from-blue-100 via-sky-50 to-white"></div>
      <div class="absolute -left-16 top-10 h-40 w-40 rounded-full bg-blue-200/45 blur-3xl"></div>
      <div class="absolute right-0 top-20 h-52 w-52 rounded-full bg-sky-200/35 blur-3xl"></div>

      <div class="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(job.category)">
              {{ job.category }}
            </span>
            <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getModeClasses(job.mode)">
              {{ job.mode }}
            </span>
            <span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              {{ job.type }}
            </span>
          </div>

          <div class="mt-6 flex items-start gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-[22px] bg-blue-600 text-2xl font-bold text-white shadow-sm">
              {{ job.company[0] }}
            </div>
            <div>
              <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{{ job.title }}</h1>
              <p class="mt-2 text-lg font-medium text-slate-600">{{ job.company }} · {{ job.location }}</p>
            </div>
          </div>

          <p class="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {{ job.summary }}
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <span class="rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              {{ job.salary }}
            </span>
            <span class="rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              {{ job.posted }}
            </span>
            <span class="rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              {{ job.deadline }}
            </span>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-4">
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ job.applicants }}</p>
              <p class="mt-1 text-sm text-slate-600">Pelamar masuk</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ job.interviewSlots.length }}</p>
              <p class="mt-1 text-sm text-slate-600">Slot interview</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ job.stages.length }}</p>
              <p class="mt-1 text-sm text-slate-600">Tahap rekrutmen</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ job.recruiter.role }}</p>
              <p class="mt-1 text-sm text-slate-600">PIC utama</p>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[28px] border border-white/80 bg-slate-900 p-6 text-white shadow-[0_24px_50px_-36px_rgba(15,23,42,0.8)]">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Recruitment snapshot</p>
            <h2 class="mt-3 text-2xl font-bold">Lamaran dibuat lebih realistis dan siap action.</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Kandidat bisa langsung mengunggah CV PDF, memilih slot interview online, dan melihat tahapan proses tanpa harus menebak langkah berikutnya.
            </p>

            <div class="mt-6 space-y-3">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-sm text-slate-300">Recruiter</p>
                <p class="mt-1 text-lg font-semibold text-white">{{ job.recruiter.name }}</p>
                <p class="text-sm text-slate-400">{{ job.recruiter.email }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-sm text-slate-300">Dokumen utama</p>
                <ul class="mt-2 space-y-2 text-sm text-slate-200">
                  <li v-for="document in job.documents" :key="document">{{ document }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Tentang perusahaan</p>
            <p class="mt-4 text-sm leading-7 text-slate-600">{{ job.companySummary }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
      <div class="space-y-6">
        <article class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Ringkasan peran</p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">Detail posisi yang lebih lengkap dan lebih mudah dipahami.</h2>
          <p class="mt-4 text-base leading-8 text-slate-600">{{ job.description }}</p>

          <div class="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">Tanggung jawab utama</h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="responsibility in job.responsibilities"
                  :key="responsibility"
                  class="flex items-start gap-3 text-sm leading-7 text-slate-600"
                >
                  <span class="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  <span>{{ responsibility }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-slate-900">Kualifikasi utama</h3>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="requirement in job.requirements"
                  :key="requirement"
                  class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {{ requirement }}
                </span>
              </div>

              <h4 class="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Nilai tambah</h4>
              <ul class="mt-3 space-y-3">
                <li
                  v-for="item in job.preferred"
                  :key="item"
                  class="flex items-start gap-3 text-sm leading-7 text-slate-600"
                >
                  <span class="mt-2 h-2 w-2 rounded-full bg-slate-900"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Benefit dan proses</p>
          <div class="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">Benefit</h3>
              <div class="mt-4 flex flex-wrap gap-3">
                <span
                  v-for="benefit in job.benefits"
                  :key="benefit"
                  class="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
                >
                  {{ benefit }}
                </span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-slate-900">Tahapan rekrutmen</h3>
              <div class="mt-4 space-y-4">
                <div
                  v-for="(stage, index) in job.stages"
                  :key="stage.title"
                  class="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <div class="flex items-start gap-4">
                    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {{ index + 1 }}
                    </div>
                    <div>
                      <h4 class="font-semibold text-slate-900">{{ stage.title }}</h4>
                      <p class="mt-1 text-sm leading-6 text-slate-600">{{ stage.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <aside class="space-y-6">
        <section class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Kirim lamaran</p>
          <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Upload CV PDF dan pilih jadwal interview online.</h2>
          <p class="mt-3 text-sm leading-6 text-slate-500">
            Data ini masih simulasi frontend, tapi alurnya dibuat seperti proses lamaran sungguhan.
          </p>

          <div v-if="applicationSuccess" class="mt-5 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4">
            <h3 class="text-base font-semibold text-emerald-800">Lamaran berhasil disiapkan</h3>
            <p class="mt-2 text-sm leading-6 text-emerald-700">
              {{ applicationSuccess.applicantName }} sudah mengirim {{ applicationSuccess.cvName }} dan memilih slot
              {{ applicationSuccess.slotLabel }} via {{ applicationSuccess.slotHost }}. Recruiter {{ applicationSuccess.recruiterName }}
              akan meninjau data Anda terlebih dahulu.
            </p>
          </div>

          <div v-if="submitError" class="mt-5 rounded-[24px] border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
            {{ submitError }}
          </div>

          <form class="mt-6 space-y-5" @submit.prevent="submitApplication">
            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Nama lengkap</span>
              <input
                v-model="applicationForm.fullName"
                type="text"
                placeholder="Nama sesuai CV"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Email aktif</span>
                <input
                  v-model="applicationForm.email"
                  type="email"
                  placeholder="nama@contoh.com"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Nomor WhatsApp</span>
                <input
                  v-model="applicationForm.phone"
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Upload CV PDF</span>
              <input
                ref="cvInput"
                type="file"
                accept=".pdf,application/pdf"
                class="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                @change="handleCvChange"
              />
              <p class="mt-2 text-xs text-slate-500">Format yang diterima: PDF, ukuran maksimal 5 MB.</p>
              <p v-if="uploadedCv" class="mt-2 text-sm font-medium text-emerald-700">
                {{ uploadedCv.name }} · {{ uploadedCv.size }}
              </p>
              <p v-if="uploadError" class="mt-2 text-sm text-rose-600">{{ uploadError }}</p>
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Link portfolio atau LinkedIn</span>
              <input
                v-model="applicationForm.portfolioUrl"
                type="url"
                placeholder="https://..."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Ekspektasi gaji</span>
              <input
                v-model="applicationForm.expectedSalary"
                type="text"
                :placeholder="job.salary"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <fieldset class="block">
              <legend class="mb-3 text-sm font-medium text-slate-700">Pilih jam interview online</legend>
              <div class="space-y-3">
                <label
                  v-for="slot in job.interviewSlots"
                  :key="slot.id"
                  class="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-white"
                >
                  <input
                    v-model="selectedSlotId"
                    :value="slot.id"
                    type="radio"
                    class="mt-1 h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-200"
                  />
                  <div>
                    <p class="font-semibold text-slate-900">{{ slot.label }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ slot.host }} · {{ slot.duration }}</p>
                  </div>
                </label>
              </div>
            </fieldset>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Catatan tambahan</span>
              <textarea
                v-model="applicationForm.notes"
                rows="4"
                placeholder="Tuliskan konteks singkat, ketersediaan mulai kerja, atau hal penting lain bila perlu."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
              ></textarea>
            </label>

            <label class="inline-flex items-start gap-3 text-sm text-slate-600">
              <input
                v-model="applicationForm.agreeToProcess"
                type="checkbox"
                class="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
              />
              <span>Saya menyetujui data lamaran ini digunakan untuk proses seleksi dan penjadwalan interview online.</span>
            </label>

            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              Kirim CV dan jadwalkan interview
            </button>
          </form>
        </section>

        <section class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Preview jadwal</p>
          <div v-if="selectedSlot" class="mt-4 rounded-[24px] border border-blue-100 bg-blue-50 p-4">
            <p class="text-sm text-blue-700">Slot terpilih</p>
            <h3 class="mt-1 text-lg font-semibold text-slate-900">{{ selectedSlot.label }}</h3>
            <p class="mt-1 text-sm text-slate-600">{{ selectedSlot.host }} · {{ selectedSlot.duration }}</p>
          </div>
          <p v-else class="mt-4 text-sm leading-6 text-slate-500">
            Pilih salah satu slot interview online di form lamaran untuk melihat ringkasannya di sini.
          </p>
        </section>
      </aside>
    </section>
  </div>

  <div v-else class="mx-auto max-w-3xl rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
    <h1 class="text-2xl font-bold text-slate-900">Lowongan tidak ditemukan</h1>
    <p class="mt-3 text-sm leading-6 text-slate-600">
      Posisi yang kamu buka belum tersedia atau mungkin sudah ditutup. Kembali ke halaman utama untuk melihat lowongan lain.
    </p>
    <button
      type="button"
      class="mt-6 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      @click="router.push('/')"
    >
      Kembali ke home
    </button>
  </div>
</template>
