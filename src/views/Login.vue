<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const showPassword = ref(false)
const isSubmitting = ref(false)
const form = ref({
  email: '',
  password: '',
  remember: true
})

const helperCards = [
  {
    title: 'Lowongan terkurasi',
    description: 'Temukan peluang kerja yang relevan tanpa harus menyaring terlalu banyak noise.'
  },
  {
    title: 'Forum yang aktif',
    description: 'Masuk ke diskusi karier, review proses interview, dan berbagi pengalaman kerja.'
  },
  {
    title: 'Komunitas yang suportif',
    description: 'Terkoneksi dengan job seeker, recruiter, dan profesional dari berbagai bidang.'
  }
]

const canSubmit = computed(() => {
  return form.value.email.trim() !== '' && form.value.password.trim() !== ''
})

const submitLabel = computed(() => {
  return isSubmitting.value ? 'Memproses...' : 'Masuk ke akun'
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
      <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-blue-100 via-sky-50 to-white"></div>
      <div class="absolute -left-16 top-12 h-40 w-40 rounded-full bg-blue-200/35 blur-3xl"></div>
      <div class="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl"></div>

      <div class="relative grid lg:grid-cols-[1.1fr_0.9fr]">
        <div class="border-b border-blue-100/80 px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r">
          <div class="max-w-xl">
            <span class="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
              Login JobForum
            </span>

            <h1 class="mt-6 max-w-lg text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Masuk dengan tampilan yang bersih, fokus, dan mudah dipahami.
            </h1>

            <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Satu tempat untuk melacak peluang kerja, ikut diskusi forum, dan tetap dekat dengan komunitas profesional.
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p class="text-2xl font-bold text-slate-900">1.2k+</p>
                <p class="mt-1 text-sm text-slate-600">Lowongan aktif</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p class="text-2xl font-bold text-slate-900">320+</p>
                <p class="mt-1 text-sm text-slate-600">Topik forum</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p class="text-2xl font-bold text-slate-900">24/7</p>
                <p class="mt-1 text-sm text-slate-600">Akses komunitas</p>
              </div>
            </div>

            <div class="mt-8 space-y-4">
              <article
                v-for="card in helperCards"
                :key="card.title"
                class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
              >
                <div class="flex items-start gap-4">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white">
                    {{ card.title[0] }}
                  </div>
                  <div>
                    <h2 class="text-base font-semibold text-slate-900">{{ card.title }}</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-600">{{ card.description }}</p>
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
                    class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
                  >
                    Masuk
                  </RouterLink>
                  <RouterLink
                    to="/register"
                    class="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
                  >
                    Register
                  </RouterLink>
                </div>

                <p class="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                  Welcome back
                </p>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">Masuk ke akun Anda</h2>
                <p class="mt-2 text-sm leading-6 text-slate-500">
                  Gunakan email dan kata sandi untuk membuka dashboard, forum, dan riwayat aktivitas Anda.
                </p>
              </div>

              <form class="space-y-5" @submit.prevent="handleSubmit">
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
                  <span class="mb-2 block text-sm font-medium text-slate-700">Kata sandi</span>
                  <div class="relative">
                    <input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Masukkan kata sandi"
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

                <div class="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                  <label class="inline-flex items-center gap-3">
                    <input
                      v-model="form.remember"
                      type="checkbox"
                      class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                    />
                    Ingat saya
                  </label>
                  <a href="#" class="font-medium text-blue-600 transition hover:text-blue-700">
                    Lupa kata sandi?
                  </a>
                </div>

                <button
                  type="submit"
                  :disabled="!canSubmit || isSubmitting"
                  class="w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {{ submitLabel }}
                </button>
              </form>

              <div class="my-6 flex items-center gap-4">
                <div class="h-px flex-1 bg-slate-200"></div>
                <span class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">atau</span>
                <div class="h-px flex-1 bg-slate-200"></div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Masuk dengan Google
                </button>
                <button
                  type="button"
                  class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Masuk sebagai tamu
                </button>
              </div>

              <p class="mt-6 text-center text-sm text-slate-500">
                Belum punya akun?
                <RouterLink to="/register" class="font-semibold text-blue-600 transition hover:text-blue-700">
                  Buat akun sekarang
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
