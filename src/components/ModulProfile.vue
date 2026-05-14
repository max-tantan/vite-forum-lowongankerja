<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  currentUser: Object,
  profile: Object,
  profileCards: Array,
  contactItems: Array,
  quickLinks: Array,
  saveError: String,
  saveMessage: String,
  cvError: String,
  cvReady: Boolean
})

const emit = defineEmits(['open-edit', 'cv-change', 'remove-cv'])
</script>

<template>
  <section class="h-[calc(100vh-170px)] min-h-[24rem] overflow-y-auto overflow-x-hidden space-y-6 scroll-smooth">
    <div class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] min-h-0">
      <div class="space-y-6">
        <article class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Informasi profil</p>
              <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Profile summary yang siap dibaca cepat.</h2>
            </div>
            <button
              type="button"
              class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              @click="$emit('open-edit')"
            >
              Edit profile
            </button>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-slate-900">Tentang saya</h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">{{ profile.about }}</p>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-slate-900">Skill utama</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="skill in profile.skills"
                :key="skill"
                class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div v-if="saveError" class="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
            {{ saveError }}
          </div>
          <div v-if="saveMessage" class="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
            {{ saveMessage }}
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

          <div class="mt-5 grid gap-4">
            <div
              v-for="item in contactItems"
              :key="item.label"
              class="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <p class="text-sm text-slate-500">{{ item.label }}</p>
              <p class="mt-1 break-words text-base font-semibold text-slate-900">{{ item.value }}</p>
            </div>
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
                type="file"
                accept=".pdf,application/pdf"
                class="hidden"
                @change="$emit('cv-change', $event)"
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
                  @click="$emit('remove-cv')"
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
    </div>
  </section>
</template>
