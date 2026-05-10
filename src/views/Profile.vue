<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { loadStoredProfile, saveStoredProfile } from '../composables/useProfile'

const router = useRouter()
const { currentUser, signOut } = useAuth()

const profile = ref(null)
const skillsInput = ref('')
const saveMessage = ref('')
const saveError = ref('')
const bannerError = ref('')
const cvError = ref('')
const bannerInput = ref(null)
const cvInput = ref(null)

const quickLinks = [
  { title: 'Lanjut cari lowongan', description: 'Kembali ke halaman utama untuk melihat posisi terbaru.', to: '/' },
  { title: 'Buka forum diskusi', description: 'Masuk ke thread komunitas untuk diskusi karier dan interview.', to: '/forum' },
  { title: 'Masuk grup chat', description: 'Lanjutkan komunikasi cepat dengan komunitas di room chat.', to: '/chat' }
]

const profileCards = computed(() => {
  if (!currentUser.value || !profile.value) {
    return []
  }

  return [
    { label: 'Username', value: currentUser.value.username },
    { label: 'Role', value: currentUser.value.role },
    { label: 'Email', value: currentUser.value.email },
    { label: 'Target Role', value: profile.value.targetRole }
  ]
})

const userInitial = computed(() => {
  if (!currentUser.value?.username) {
    return 'U'
  }

  return currentUser.value.username.slice(0, 1).toUpperCase()
})

const bannerStyle = computed(() => {
  if (profile.value?.bannerImage?.dataUrl) {
    return {
      backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.58), rgba(37,99,235,0.32)), url(${profile.value.bannerImage.dataUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }

  return {}
})

const cvReady = computed(() => {
  return Boolean(profile.value?.cvFile?.dataUrl)
})

const profileUpdatedAt = computed(() => {
  if (!profile.value?.updatedAt) {
    return 'Belum ada perubahan tersimpan'
  }

  return new Date(profile.value.updatedAt).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
})

const resetAlerts = () => {
  saveMessage.value = ''
  saveError.value = ''
  bannerError.value = ''
  cvError.value = ''
}

const persistProfile = () => {
  if (!currentUser.value || !profile.value) {
    return
  }

  resetAlerts()
  const nextSkills = skillsInput.value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8)

  const result = saveStoredProfile(currentUser.value, {
    ...profile.value,
    skills: nextSkills.length > 0 ? nextSkills : profile.value.skills
  })

  if (!result.ok) {
    saveError.value = result.message
    return
  }

  profile.value = result.profile
  skillsInput.value = result.profile.skills.join(', ')
  saveMessage.value = 'Perubahan profil berhasil disimpan secara lokal.'
}

const loadProfile = () => {
  if (!currentUser.value) {
    profile.value = null
    return
  }

  const storedProfile = loadStoredProfile(currentUser.value)
  profile.value = storedProfile
  skillsInput.value = storedProfile.skills.join(', ')
}

const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Gagal membaca file.'))
    reader.readAsDataURL(file)
  })
}

const handleBannerChange = async (event) => {
  const [file] = event.target.files || []
  bannerError.value = ''
  saveMessage.value = ''

  if (!file || !profile.value) {
    return
  }

  if (!file.type.startsWith('image/')) {
    bannerError.value = 'Banner harus berupa file gambar.'
    event.target.value = ''
    return
  }

  if (file.size > 1024 * 1024) {
    bannerError.value = 'Ukuran banner maksimal 1 MB agar aman disimpan lokal.'
    event.target.value = ''
    return
  }

  try {
    const dataUrl = await readFileAsDataUrl(file)
    profile.value.bannerImage = {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      dataUrl
    }
    persistProfile()
  } catch {
    bannerError.value = 'Banner gagal diproses.'
  }
}

const handleCvChange = async (event) => {
  const [file] = event.target.files || []
  cvError.value = ''
  saveMessage.value = ''

  if (!file || !profile.value) {
    return
  }

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

  if (!isPdf) {
    cvError.value = 'CV harus dalam format PDF.'
    event.target.value = ''
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    cvError.value = 'Ukuran CV maksimal 2 MB karena disimpan lokal di browser.'
    event.target.value = ''
    return
  }

  try {
    const dataUrl = await readFileAsDataUrl(file)
    profile.value.cvFile = {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      dataUrl,
      uploadedAt: new Date().toISOString()
    }
    persistProfile()
  } catch {
    cvError.value = 'CV gagal diproses.'
  }
}

const removeBanner = () => {
  if (!profile.value) {
    return
  }

  profile.value.bannerImage = null

  if (bannerInput.value) {
    bannerInput.value.value = ''
  }

  persistProfile()
}

const removeCv = () => {
  if (!profile.value) {
    return
  }

  profile.value.cvFile = null

  if (cvInput.value) {
    cvInput.value.value = ''
  }

  persistProfile()
}

const handleSignOut = () => {
  signOut()
  router.push('/login')
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div v-if="currentUser && profile" class="space-y-8">
    <section
      class="relative overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#f8fbff_100%)] shadow-[0_30px_80px_-50px_rgba(37,99,235,0.35)]"
      :style="bannerStyle"
    >
      <div class="px-6 pb-8 pt-6 sm:px-8 lg:px-10 lg:pb-10 lg:pt-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 backdrop-blur">
            Profile workspace
          </div>

          <div class="flex flex-wrap gap-3">
            <label class="inline-flex cursor-pointer items-center rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white">
              <input
                ref="bannerInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleBannerChange"
              />
              Upload banner
            </label>
            <button
              type="button"
              class="rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
              @click="handleSignOut"
            >
              Keluar
            </button>
          </div>
        </div>

        <div class="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="flex items-start gap-5">
            <div class="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/80 bg-slate-900 text-3xl font-bold text-white shadow-lg">
              {{ userInitial }}
            </div>
            <div class="max-w-3xl">
              <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {{ currentUser.fullName }}
              </h1>
              <p class="mt-3 text-lg font-medium text-slate-700">
                {{ profile.headline }}
              </p>
              <div class="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                <span class="rounded-full border border-white/80 bg-white/85 px-4 py-2 shadow-sm">{{ profile.location }}</span>
                <span class="rounded-full border border-white/80 bg-white/85 px-4 py-2 shadow-sm">{{ profile.availability }}</span>
                <span class="rounded-full border border-white/80 bg-white/85 px-4 py-2 shadow-sm">{{ profile.targetRole }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-[26px] border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
            <p class="text-sm text-slate-500">Update terakhir</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">{{ profileUpdatedAt }}</p>
          </div>
        </div>

        <p v-if="bannerError" class="mt-5 text-sm font-medium text-rose-600">{{ bannerError }}</p>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-6">
        <article class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Informasi profil</p>
              <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Lengkapi profil agar lebih siap dilihat recruiter.</h2>
            </div>
            <p class="text-sm text-slate-500">Perubahan disimpan lokal di browser ini.</p>
          </div>

          <div class="mt-6 space-y-5">
            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Headline profile</span>
              <input
                v-model="profile.headline"
                type="text"
                placeholder="Contoh: Frontend developer yang fokus pada UI modern"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Lokasi</span>
                <input
                  v-model="profile.location"
                  type="text"
                  placeholder="Jakarta, Indonesia"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Target role</span>
                <input
                  v-model="profile.targetRole"
                  type="text"
                  placeholder="Frontend Developer"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Ketersediaan interview</span>
              <select
                v-model="profile.availability"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option>Siap interview dalam 1 minggu</option>
                <option>Siap interview dalam 2 minggu</option>
                <option>Terbuka untuk diskusi terlebih dahulu</option>
              </select>
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Tentang saya</span>
              <textarea
                v-model="profile.about"
                rows="5"
                placeholder="Tulis ringkasan singkat tentang pengalaman, fokus, dan nilai yang bisa kamu bawa."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
              ></textarea>
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Skill utama</span>
              <input
                v-model="skillsInput"
                type="text"
                placeholder="Pisahkan dengan koma, misalnya Vue.js, Figma, Interview Prep"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in profile.skills"
                :key="skill"
                class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {{ skill }}
              </span>
            </div>

            <div v-if="saveError" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
              {{ saveError }}
            </div>
            <div v-if="saveMessage" class="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
              {{ saveMessage }}
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                @click="persistProfile"
              >
                Simpan perubahan profil
              </button>
              <button
                v-if="profile.bannerImage"
                type="button"
                class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                @click="removeBanner"
              >
                Hapus banner
              </button>
            </div>
          </div>
        </article>

        <section class="grid gap-5 md:grid-cols-3">
          <RouterLink
            v-for="item in quickLinks"
            :key="item.to"
            :to="item.to"
            class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_-40px_rgba(37,99,235,0.45)]"
          >
            <h2 class="text-xl font-semibold tracking-tight text-slate-900">{{ item.title }}</h2>
            <p class="mt-3 text-sm leading-7 text-slate-600">{{ item.description }}</p>
          </RouterLink>
        </section>
      </div>

      <div class="space-y-6">
        <aside class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Info akun</p>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <div
              v-for="card in profileCards"
              :key="card.label"
              class="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <p class="text-sm text-slate-500">{{ card.label }}</p>
              <p class="mt-1 text-base font-semibold text-slate-900">{{ card.value }}</p>
            </div>
          </div>

          <div class="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p class="text-sm font-semibold text-emerald-800">Akun demo aktif</p>
            <p class="mt-1 text-sm leading-6 text-emerald-700">
              Kredensial virtual lokal yang aktif adalah <span class="font-semibold">user / 123</span>.
            </p>
          </div>
        </aside>

        <aside class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">CV profile</p>
              <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Upload CV PDF dan lihat langsung dari profile.</h2>
            </div>
            <label class="inline-flex cursor-pointer items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              <input
                ref="cvInput"
                type="file"
                accept=".pdf,application/pdf"
                class="hidden"
                @change="handleCvChange"
              />
              Upload CV PDF
            </label>
          </div>

          <p class="mt-4 text-sm leading-6 text-slate-500">
            Karena ini simulasi lokal di browser, ukuran CV dibatasi maksimal 2 MB agar tetap stabil saat disimpan.
          </p>

          <p v-if="cvError" class="mt-4 text-sm font-medium text-rose-600">{{ cvError }}</p>

          <div v-if="cvReady" class="mt-6 space-y-4">
            <div class="rounded-[24px] border border-slate-100 bg-slate-50/80 p-4">
              <p class="text-sm text-slate-500">File aktif</p>
              <p class="mt-1 text-base font-semibold text-slate-900">{{ profile.cvFile.name }}</p>
              <p class="mt-1 text-sm text-slate-500">{{ profile.cvFile.size }}</p>
              <div class="mt-4 flex flex-wrap gap-3">
                <a
                  :href="profile.cvFile.dataUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Lihat CV
                </a>
                <a
                  :href="profile.cvFile.dataUrl"
                  :download="profile.cvFile.name"
                  class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Download
                </a>
                <button
                  type="button"
                  class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  @click="removeCv"
                >
                  Hapus CV
                </button>
              </div>
            </div>

            <div class="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
              <div class="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                Preview CV
              </div>
              <iframe
                :src="profile.cvFile.dataUrl"
                title="CV Preview"
                class="h-[520px] w-full bg-slate-50"
              ></iframe>
            </div>
          </div>

          <div
            v-else
            class="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center"
          >
            <h3 class="text-lg font-semibold text-slate-900">Belum ada CV yang tersimpan</h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Upload CV PDF agar profilmu terasa lebih siap dan bisa langsung ditinjau dari halaman ini.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </div>

  <div v-else class="mx-auto max-w-3xl rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
    <h1 class="text-2xl font-bold text-slate-900">Kamu belum login</h1>
    <p class="mt-3 text-sm leading-6 text-slate-600">
      Masuk dengan akun demo lokal untuk membuka halaman profile yang lebih lengkap.
    </p>
    <RouterLink
      to="/login"
      class="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      Buka halaman login
    </RouterLink>
  </div>
</template>
