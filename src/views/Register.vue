<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Job Seeker',
  agree: false
})

const roleOptions = ['Job Seeker', 'Recruiter', 'Professional']

const benefits = [
  {
    title: 'Profil lebih cepat siap',
    description: 'Simpan data utama Anda sejak awal agar proses melamar dan berdiskusi terasa lebih ringan.'
  },
  {
    title: 'Rekomendasi lebih relevan',
    description: 'Pilih peran Anda untuk membantu platform menampilkan lowongan dan komunitas yang paling sesuai.'
  },
  {
    title: 'Mulai dengan rapi',
    description: 'Tampilan register dibuat sederhana agar fokus tetap pada langkah inti pembuatan akun.'
  }
]

const canSubmit = computed(() => {
  return (
    form.value.name.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.password.trim() !== '' &&
    form.value.confirmPassword.trim() !== '' &&
    form.value.password === form.value.confirmPassword &&
    form.value.agree
  )
})

const passwordMismatch = computed(() => {
  return (
    form.value.confirmPassword.trim() !== '' &&
    form.value.password !== form.value.confirmPassword
  )
})

const submitLabel = computed(() => {
  return isSubmitting.value ? 'Membuat akun...' : 'Buat akun'
})

const handleSubmit = async () => {
  if (!canSubmit.value || isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  window.setTimeout(() => {
    isSubmitting.value = false
  }, 900)
}
</script>

<template>
  <section class="min-h-[calc(100vh-9rem)] py-4">
    <div class="relative overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_30px_80px_-48px_rgba(37,99,235,0.45)]">
      <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-sky-100 via-blue-50 to-white"></div>
      <div class="absolute -left-20 top-10 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl"></div>
      <div class="absolute -right-14 bottom-8 h-52 w-52 rounded-full bg-blue-200/30 blur-3xl"></div>

      <div class="relative grid lg:grid-cols-[1.05fr_0.95fr]">
        <div class="border-b border-blue-100/80 px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r">
          <div class="max-w-xl">
            <span class="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
              Register JobForum
            </span>

            <h1 class="mt-6 max-w-lg text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Buat akun baru dengan alur yang ringkas, bersih, dan jelas.
            </h1>

            <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Daftar sekali untuk mulai mencari peluang kerja, membangun koneksi, dan ikut diskusi yang relevan dengan tujuan karier Anda.
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p class="text-2xl font-bold text-slate-900">3 langkah</p>
                <p class="mt-1 text-sm text-slate-600">Buat akun lebih cepat</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p class="text-2xl font-bold text-slate-900">Aman</p>
                <p class="mt-1 text-sm text-slate-600">Data masuk terstruktur</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p class="text-2xl font-bold text-slate-900">Siap</p>
                <p class="mt-1 text-sm text-slate-600">Untuk forum dan lowongan</p>
              </div>
            </div>

            <div class="mt-8 space-y-4">
              <article
                v-for="item in benefits"
                :key="item.title"
                class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
              >
                <div class="flex items-start gap-4">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white">
                    {{ item.title[0] }}
                  </div>
                  <div>
                    <h2 class="text-base font-semibold text-slate-900">{{ item.title }}</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.description }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="px-6 py-10 sm:px-10">
          <div class="mx-auto w-full max-w-md">
            <div class="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]">
              <div class="mb-8">
                <div class="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
                  <RouterLink
                    to="/login"
                    class="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
                  >
                    Masuk
                  </RouterLink>
                  <RouterLink
                    to="/register"
                    class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
                  >
                    Register
                  </RouterLink>
                </div>

                <p class="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                  Create account
                </p>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">Daftar akun baru</h2>
                <p class="mt-2 text-sm leading-6 text-slate-500">
                  Isi data dasar Anda terlebih dahulu. Desainnya dibuat ringan agar proses register terasa nyaman.
                </p>
              </div>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <label class="block">
                  <span class="mb-2 block text-sm font-medium text-slate-700">Nama lengkap</span>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Nama Anda"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-medium text-slate-700">Email</span>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="nama@contoh.com"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-medium text-slate-700">Tipe akun</span>
                  <select
                    v-model="form.role"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
                  </select>
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-medium text-slate-700">Kata sandi</span>
                  <div class="relative">
                    <input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Buat kata sandi"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-3 my-auto h-10 rounded-xl px-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      @click="showPassword = !showPassword"
                    >
                      {{ showPassword ? 'Sembunyi' : 'Lihat' }}
                    </button>
                  </div>
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-medium text-slate-700">Konfirmasi kata sandi</span>
                  <div class="relative">
                    <input
                      v-model="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      placeholder="Ulangi kata sandi"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-3 my-auto h-10 rounded-xl px-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      {{ showConfirmPassword ? 'Sembunyi' : 'Lihat' }}
                    </button>
                  </div>
                  <p v-if="passwordMismatch" class="mt-2 text-sm text-rose-500">
                    Kata sandi dan konfirmasi kata sandi belum sama.
                  </p>
                </label>

                <label class="inline-flex items-start gap-3 text-sm text-slate-600">
                  <input
                    v-model="form.agree"
                    type="checkbox"
                    class="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                  />
                  <span>
                    Saya menyetujui syarat penggunaan dan kebijakan privasi JobForum.
                  </span>
                </label>

                <button
                  type="submit"
                  :disabled="!canSubmit || isSubmitting"
                  class="w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {{ submitLabel }}
                </button>
              </form>

              <p class="mt-6 text-center text-sm text-slate-500">
                Sudah punya akun?
                <RouterLink to="/login" class="font-semibold text-blue-600 transition hover:text-blue-700">
                  Masuk di sini
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
