<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const exploreLinks = [
  { label: 'Lowongan', to: '/' },
  { label: 'Forum', to: '/forum' },
  { label: 'Grup Chat', to: '/chat' }
]

const accountLinks = [
  { label: 'Masuk', to: '/login' },
  { label: 'Register', to: '/register' }
]
</script>

<template>
  <footer class="mt-12 border-t border-slate-200 bg-white">
    <div class="container mx-auto px-4 py-10">
      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_100%)] shadow-[0_16px_30px_-20px_rgba(37,99,235,0.7)]">
              <svg
                viewBox="0 0 40 40"
                class="h-6 w-6 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M13 14.5V13.5C13 11.8431 14.3431 10.5 16 10.5H24C25.6569 10.5 27 11.8431 27 13.5V14.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                />
                <rect
                  x="9.5"
                  y="14.5"
                  width="21"
                  height="14"
                  rx="4.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                />
                <path
                  d="M9.5 19.5H30.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                />
                <circle cx="24.5" cy="24" r="1.6" fill="currentColor" />
                <circle cx="19.9" cy="24" r="1.6" fill="currentColor" opacity="0.85" />
                <circle cx="15.3" cy="24" r="1.6" fill="currentColor" opacity="0.7" />
              </svg>
            </div>
            <div>
              <p class="text-lg font-bold tracking-tight text-slate-900">JobForum</p>
              <p class="text-sm text-slate-500">Career and community platform</p>
            </div>
          </div>

          <p class="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Tempat yang lebih rapi untuk cari lowongan, ikut diskusi karier, dan menjaga komunikasi komunitas tetap dekat dengan kebutuhan user.
          </p>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Explore</h2>
          <div class="mt-4 space-y-3">
            <RouterLink
              v-for="link in exploreLinks"
              :key="link.to"
              :to="link.to"
              class="block text-sm text-slate-600 transition hover:text-blue-700"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Account</h2>
          <div class="mt-4 space-y-3">
            <RouterLink
              v-for="link in accountLinks"
              :key="link.to"
              :to="link.to"
              class="block text-sm text-slate-600 transition hover:text-blue-700"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Start Here</h2>
          <div class="mt-4 rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4">
            <p class="text-sm leading-6 text-slate-600">
              Bangun akun, simpan CV, lalu lanjut ke lowongan atau forum sesuai kebutuhanmu hari ini.
            </p>
            <RouterLink
              to="/register"
              class="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Buat akun gratis
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ year }} JobForum. Dibuat lebih modern, clean, dan fokus ke UX.</p>
        <p>Designed for job discovery, discussion, and communication.</p>
      </div>
    </div>
  </footer>
</template>
