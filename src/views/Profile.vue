<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ModulProfile from '../components/ModulProfile.vue'
import { useAuth } from '../composables/useAuth'
import { loadStoredProfile, saveStoredProfile } from '../composables/useProfile'

const router = useRouter()
const { currentUser, signOut, updateCurrentUserProfile } = useAuth()

const profile = ref(null)
const editForm = ref({
  fullName: '',
  email: '',
  headline: '',
  location: '',
  targetRole: '',
  availability: '',
  phone: '',
  portfolioUrl: '',
  linkedinUrl: '',
  about: '',
  skills: ''
})

const showEditModal = ref(false)
const saveMessage = ref('')
const saveError = ref('')
const bannerError = ref('')
const cvError = ref('')
const editError = ref('')
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

const contactItems = computed(() => {
  if (!profile.value) {
    return []
  }

  return [
    { label: 'Lokasi', value: profile.value.location },
    { label: 'Ketersediaan', value: profile.value.availability },
    { label: 'Nomor Kontak', value: profile.value.phone || 'Belum diisi' },
    { label: 'Portfolio', value: profile.value.portfolioUrl || 'Belum diisi' },
    { label: 'LinkedIn', value: profile.value.linkedinUrl || 'Belum diisi' }
  ]
})

const resetAlerts = () => {
  saveMessage.value = ''
  saveError.value = ''
  bannerError.value = ''
  cvError.value = ''
  editError.value = ''
}

const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Gagal membaca file.'))
    reader.readAsDataURL(file)
  })
}

const loadProfile = () => {
  if (!currentUser.value) {
    profile.value = null
    return
  }

  profile.value = loadStoredProfile(currentUser.value)
}

const persistProfile = (nextProfile, successMessage = 'Perubahan profil berhasil disimpan secara lokal.') => {
  if (!currentUser.value) {
    return false
  }

  const result = saveStoredProfile(currentUser.value, nextProfile)

  if (!result.ok) {
    saveError.value = result.message
    return false
  }

  profile.value = result.profile
  saveMessage.value = successMessage
  return true
}

const openEditModal = () => {
  if (!currentUser.value || !profile.value) {
    return
  }

  editError.value = ''
  editForm.value = {
    fullName: currentUser.value.fullName,
    email: currentUser.value.email,
    headline: profile.value.headline,
    location: profile.value.location,
    targetRole: profile.value.targetRole,
    availability: profile.value.availability,
    phone: profile.value.phone,
    portfolioUrl: profile.value.portfolioUrl,
    linkedinUrl: profile.value.linkedinUrl,
    about: profile.value.about,
    skills: profile.value.skills.join(', ')
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editError.value = ''
}

const handleEditProfile = () => {
  if (!currentUser.value || !profile.value) {
    return
  }

  resetAlerts()

  if (editForm.value.fullName.trim() === '' || editForm.value.email.trim() === '') {
    editError.value = 'Nama lengkap dan email wajib diisi.'
    return
  }

  const authUpdate = updateCurrentUserProfile({
    fullName: editForm.value.fullName.trim(),
    email: editForm.value.email.trim()
  })

  if (!authUpdate.ok) {
    editError.value = authUpdate.message
    return
  }

  const nextSkills = editForm.value.skills
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8)

  const saved = persistProfile(
    {
      ...profile.value,
      headline: editForm.value.headline.trim(),
      location: editForm.value.location.trim(),
      targetRole: editForm.value.targetRole.trim(),
      availability: editForm.value.availability,
      phone: editForm.value.phone.trim(),
      portfolioUrl: editForm.value.portfolioUrl.trim(),
      linkedinUrl: editForm.value.linkedinUrl.trim(),
      about: editForm.value.about.trim(),
      skills: nextSkills.length > 0 ? nextSkills : profile.value.skills
    },
    'Edit profile berhasil disimpan.'
  )

  if (!saved) {
    editError.value = saveError.value || 'Perubahan profil gagal disimpan.'
    return
  }

  showEditModal.value = false
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
    persistProfile(
      {
        ...profile.value,
        bannerImage: {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          dataUrl
        }
      },
      'Banner profile berhasil diperbarui.'
    )
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
    persistProfile(
      {
        ...profile.value,
        cvFile: {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          dataUrl,
          uploadedAt: new Date().toISOString()
        }
      },
      'CV profile berhasil diperbarui.'
    )
  } catch {
    cvError.value = 'CV gagal diproses.'
  }
}

const removeBanner = () => {
  if (!profile.value) {
    return
  }

  if (bannerInput.value) {
    bannerInput.value.value = ''
  }

  persistProfile(
    {
      ...profile.value,
      bannerImage: null
    },
    'Banner berhasil dihapus.'
  )
}

const removeCv = () => {
  if (!profile.value) {
    return
  }

  if (cvInput.value) {
    cvInput.value.value = ''
  }

  persistProfile(
    {
      ...profile.value,
      cvFile: null
    },
    'CV berhasil dihapus dari profile.'
  )
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
              @click="openEditModal"
            >
              Edit profile
            </button>
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

    <ModulProfile
      :currentUser="currentUser"
      :profile="profile"
      :profileCards="profileCards"
      :contactItems="contactItems"
      :quickLinks="quickLinks"
      :saveError="saveError"
      :saveMessage="saveMessage"
      :cvError="cvError"
      :cvReady="cvReady"
      @open-edit="openEditModal"
      @cv-change="handleCvChange"
      @remove-cv="removeCv"
    />

    <Teleport to="body">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-3xl overflow-y-auto rounded-[30px] border border-white/60 bg-white shadow-[0_40px_100px_-50px_rgba(15,23,42,0.45)]">
          <div class="border-b border-slate-100 px-6 py-5 sm:px-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Edit profile</p>
                <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Perbarui identitas dan informasi profesional</h2>
                <p class="mt-1 text-sm text-slate-500">Perubahan akan langsung tersimpan lokal dan tercermin di navbar/profile.</p>
              </div>
              <button
                type="button"
                class="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                @click="closeEditModal"
              >
                Tutup
              </button>
            </div>
          </div>

          <div class="space-y-5 px-6 py-6 sm:px-7">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Nama lengkap</span>
                <input
                  v-model="editForm.fullName"
                  type="text"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <input
                  v-model="editForm.email"
                  type="email"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Headline profile</span>
              <input
                v-model="editForm.headline"
                type="text"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Lokasi</span>
                <input
                  v-model="editForm.location"
                  type="text"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Target role</span>
                <input
                  v-model="editForm.targetRole"
                  type="text"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Ketersediaan interview</span>
                <select
                  v-model="editForm.availability"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option>Siap interview dalam 1 minggu</option>
                  <option>Siap interview dalam 2 minggu</option>
                  <option>Terbuka untuk diskusi terlebih dahulu</option>
                </select>
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Nomor kontak</span>
                <input
                  v-model="editForm.phone"
                  type="text"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Portfolio URL</span>
                <input
                  v-model="editForm.portfolioUrl"
                  type="url"
                  placeholder="https://"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">LinkedIn URL</span>
                <input
                  v-model="editForm.linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Tentang saya</span>
              <textarea
                v-model="editForm.about"
                rows="5"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
              ></textarea>
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Skill utama</span>
              <input
                v-model="editForm.skills"
                type="text"
                placeholder="Pisahkan dengan koma"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div v-if="editError" class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
              {{ editError }}
            </div>
          </div>

          <div class="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p class="text-sm text-slate-500">Nama dan email yang diubah di sini akan ikut tercermin di sesi akun demo lokal.</p>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                @click="closeEditModal"
              >
                Batal
              </button>
              <button
                type="button"
                class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                @click="handleEditProfile"
              >
                Simpan edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
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
