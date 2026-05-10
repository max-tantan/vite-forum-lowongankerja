<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { forumCategories, loadForumPosts, saveForumPosts } from '../data/forumData'

const showCreateModal = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('Semua')
const posts = ref(loadForumPosts())

const newPost = ref({
  title: '',
  content: '',
  category: 'Teknologi',
  author: 'User123'
})

const categories = forumCategories

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return posts.value.filter((post) => {
    const searchableText = [
      post.title,
      post.content,
      post.author,
      post.category,
      ...(post.tags || [])
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch = query === '' || searchableText.includes(query)
    const matchesCategory = selectedCategory.value === 'Semua' || post.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

const sortedPosts = computed(() => {
  return [...filteredPosts.value].sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return Number(b.isPinned) - Number(a.isPinned)
    }

    return b.id - a.id
  })
})

const totalReplies = computed(() => {
  return posts.value.reduce((total, post) => total + post.comments.length, 0)
})

const totalEngagement = computed(() => {
  return posts.value.reduce((total, post) => total + post.likes + post.comments.length, 0)
})

const activeContributors = computed(() => {
  return new Set(posts.value.map((post) => post.author)).size
})

const spotlightPost = computed(() => {
  return sortedPosts.value[0] || posts.value[0] || null
})

const trendingPosts = computed(() => {
  return [...posts.value]
    .sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length))
    .slice(0, 3)
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedCategory.value !== 'Semua'
})

const canCreatePost = computed(() => {
  return newPost.value.title.trim() !== '' && newPost.value.content.trim() !== ''
})

const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  newPost.value = {
    title: '',
    content: '',
    category: 'Teknologi',
    author: 'User123'
  }
}

const createExcerpt = (content) => {
  return content.length > 150 ? `${content.slice(0, 147)}...` : content
}

const extractTags = (title, category) => {
  const keywordTags = title
    .split(' ')
    .map((word) => word.replace(/[^\w]/g, ''))
    .filter((word) => word.length >= 5)
    .slice(0, 2)

  return [category, ...keywordTags]
}

const createPost = () => {
  if (!canCreatePost.value) {
    return
  }

  const post = {
    id: posts.value.length + 1,
    title: newPost.value.title,
    content: newPost.value.content,
    excerpt: createExcerpt(newPost.value.content),
    author: newPost.value.author,
    authorRole: 'Community Member',
    category: newPost.value.category,
    createdAt: 'Baru saja',
    lastActivity: 'Baru saja',
    likes: 0,
    views: 0,
    participants: 1,
    isPinned: false,
    tags: extractTags(newPost.value.title, newPost.value.category),
    comments: []
  }

  posts.value.unshift(post)
  saveForumPosts(posts.value)
  closeCreateModal()
}

const likePost = (post) => {
  post.likes += 1
  post.lastActivity = 'Baru saja'
  saveForumPosts(posts.value)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Semua'
}

const getCategoryClasses = (category) => {
  const tones = {
    Teknologi: 'border-blue-100 bg-blue-50 text-blue-700',
    Karir: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    TipsInterview: 'border-amber-100 bg-amber-50 text-amber-700',
    Diskusi: 'border-violet-100 bg-violet-50 text-violet-700'
  }

  return tones[category] || 'border-slate-200 bg-slate-100 text-slate-700'
}

const getCategoryButtonClasses = (category) => {
  if (selectedCategory.value === category) {
    return 'border-blue-600 bg-blue-600 text-white shadow-sm'
  }

  return 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
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
            Community discussion space
          </span>

          <h1 class="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Forum yang lebih modern, lebih fokus, dan lebih enak dipakai untuk berdiskusi.
          </h1>

          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Topik penting sekarang tampil lebih rapi, pencarian terasa lebih ringan, dan user bisa memahami konteks diskusi hanya dalam beberapa detik.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              @click="openCreateModal"
            >
              Buat diskusi baru
            </button>
            <RouterLink
              to="/chat"
              class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Lanjut ke grup chat
            </RouterLink>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ posts.length }}+</p>
              <p class="mt-1 text-sm text-slate-600">Diskusi aktif</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ totalReplies }}+</p>
              <p class="mt-1 text-sm text-slate-600">Balasan komunitas</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ activeContributors }}+</p>
              <p class="mt-1 text-sm text-slate-600">Kontributor aktif</p>
            </div>
          </div>

          <div class="mt-8 rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.3)] backdrop-blur sm:p-5">
            <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-700">Cari topik, kategori, author, atau kata kunci</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Contoh: interview, startup, remote, portfolio"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <RouterLink
                to="/register"
                class="inline-flex h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Bangun profil dulu
              </RouterLink>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                class="rounded-full border px-4 py-2 text-sm font-medium transition"
                :class="getCategoryButtonClasses(category)"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{{ sortedPosts.length }} topik sesuai pencarian saat ini</span>
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
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Ringkasan komunitas</p>
            <h2 class="mt-3 text-2xl font-bold">Forum dibuat lebih nyaman untuk membaca cepat dan memberi respon cepat.</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Informasi penting ditaruh di depan: kategori, engagement, author, dan ringkasan topik. Ini membantu user memutuskan thread mana yang layak dibuka lebih dulu.
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-sm text-slate-300">Total engagement</p>
                <p class="mt-1 text-xl font-semibold text-white">{{ totalEngagement }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-sm text-slate-300">Topik pinned</p>
                <p class="mt-1 text-xl font-semibold text-white">{{ posts.filter((post) => post.isPinned).length }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Diskusi trending</p>
            <div class="mt-4 space-y-4">
              <RouterLink
                v-for="post in trendingPosts"
                :key="post.id"
                :to="`/forum/${post.id}`"
                class="block rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-slate-200 hover:bg-white"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(post.category)">
                    {{ post.category }}
                  </span>
                  <span class="text-xs text-slate-400">{{ post.likes + post.comments.length }} interaksi</span>
                </div>
                <h3 class="mt-3 text-base font-semibold text-slate-900">{{ post.title }}</h3>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ post.excerpt }}</p>
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
      <div>
        <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Daftar diskusi</p>
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">Topik komunitas yang tampil lebih rapi dan lebih mudah dipindai.</h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Kartu diskusi dibuat lebih editorial: judul yang kuat, ringkasan cepat, tag relevan, dan metrik interaksi tanpa terasa padat.
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <p class="font-semibold text-slate-900">{{ sortedPosts.length }} topik ditemukan</p>
            <p v-if="selectedCategory !== 'Semua'" class="mt-1">Filter aktif: {{ selectedCategory }}</p>
            <p v-else class="mt-1">Menampilkan seluruh kategori diskusi</p>
          </div>
        </div>

        <div v-if="sortedPosts.length > 0" class="space-y-5">
          <RouterLink
            v-for="post in sortedPosts"
            :key="post.id"
            :to="`/forum/${post.id}`"
            class="group block rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_-40px_rgba(37,99,235,0.45)]"
          >
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(post.category)">
                    {{ post.category }}
                  </span>
                  <span
                    v-if="post.isPinned"
                    class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    Pinned
                  </span>
                  <span class="text-sm text-slate-400">{{ post.createdAt }}</span>
                </div>

                <h3 class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 transition group-hover:text-blue-700">
                  {{ post.title }}
                </h3>
                <p class="mt-3 text-sm leading-7 text-slate-600">
                  {{ post.excerpt }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="w-full lg:max-w-[240px]">
                <div class="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                      {{ getInitials(post.author) }}
                    </div>
                    <div>
                      <p class="font-semibold text-slate-900">{{ post.author }}</p>
                      <p class="text-sm text-slate-500">{{ post.authorRole }}</p>
                    </div>
                  </div>

                  <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p class="text-slate-400">Balasan</p>
                      <p class="mt-1 font-semibold text-slate-900">{{ post.comments.length }}</p>
                    </div>
                    <div>
                      <p class="text-slate-400">Dilihat</p>
                      <p class="mt-1 font-semibold text-slate-900">{{ post.views }}</p>
                    </div>
                    <div>
                      <p class="text-slate-400">Like</p>
                      <p class="mt-1 font-semibold text-slate-900">{{ post.likes }}</p>
                    </div>
                    <div>
                      <p class="text-slate-400">Aktif</p>
                      <p class="mt-1 font-semibold text-slate-900">{{ post.lastActivity }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{{ post.participants }} partisipan</span>
                <span>{{ post.comments.length }} komentar</span>
                <span>{{ post.likes }} suka</span>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                  @click.stop.prevent="likePost(post)"
                >
                  Suka
                </button>
                <span class="text-sm font-semibold text-blue-700">Buka diskusi</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <div
          v-else
          class="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm"
        >
          <h3 class="text-xl font-semibold text-slate-900">Belum ada topik yang cocok</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Coba ubah kata kunci pencarian atau pindah kategori agar daftar diskusinya lebih luas.
          </p>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              @click="resetFilters"
            >
              Reset filter
            </button>
            <button
              type="button"
              class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              @click="openCreateModal"
            >
              Buat topik baru
            </button>
          </div>
        </div>
      </div>

      <aside class="space-y-5">
        <div
          v-if="spotlightPost"
          class="rounded-[28px] border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Spotlight thread</p>
          <h3 class="mt-3 text-2xl font-bold tracking-tight text-slate-900">{{ spotlightPost.title }}</h3>
          <p class="mt-2 text-sm font-medium text-slate-600">{{ spotlightPost.author }} · {{ spotlightPost.authorRole }}</p>
          <p class="mt-4 text-sm leading-6 text-slate-600">
            {{ spotlightPost.excerpt }}
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(spotlightPost.category)">
              {{ spotlightPost.category }}
            </span>
            <span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              {{ spotlightPost.comments.length }} komentar
            </span>
          </div>

          <RouterLink
            :to="`/forum/${spotlightPost.id}`"
            class="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Lihat detail topik
          </RouterLink>
        </div>

        <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Aksi cepat</p>
          <div class="mt-4 space-y-4">
            <RouterLink
              to="/chat"
              class="block rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-slate-200 hover:bg-white"
            >
              <h3 class="text-base font-semibold text-slate-900">Diskusi yang lebih santai</h3>
              <p class="mt-1 text-sm leading-6 text-slate-600">Masuk ke grup chat saat kamu butuh jawaban cepat atau ngobrol ringan.</p>
            </RouterLink>
            <RouterLink
              to="/register"
              class="block rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-slate-200 hover:bg-white"
            >
              <h3 class="text-base font-semibold text-slate-900">Lengkapi identitas kamu</h3>
              <p class="mt-1 text-sm leading-6 text-slate-600">Akun yang rapi bikin interaksi komunitas dan proses melamar jadi lebih mulus.</p>
            </RouterLink>
          </div>
        </div>
      </aside>
    </section>

    <Teleport to="body">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-2xl overflow-y-auto rounded-[30px] border border-white/60 bg-white shadow-[0_40px_100px_-50px_rgba(15,23,42,0.45)]">
          <div class="border-b border-slate-100 px-6 py-5 sm:px-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">New discussion</p>
                <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Buat postingan baru</h2>
                <p class="mt-1 text-sm text-slate-500">Tulis topik dengan jelas agar respons dari komunitas lebih relevan.</p>
              </div>
              <button
                type="button"
                class="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                @click="closeCreateModal"
              >
                Tutup
              </button>
            </div>
          </div>

          <div class="space-y-5 px-6 py-6 sm:px-7">
            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Judul topik</span>
              <input
                v-model="newPost.title"
                type="text"
                placeholder="Contoh: Tips menyusun portfolio untuk fresh graduate"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Kategori</span>
              <select
                v-model="newPost.category"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option v-for="category in categories.slice(1)" :key="category" :value="category">{{ category }}</option>
              </select>
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Isi diskusi</span>
              <textarea
                v-model="newPost.content"
                rows="7"
                placeholder="Jelaskan konteks, pertanyaan, atau pengalaman yang ingin kamu bagikan..."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
              ></textarea>
            </label>
          </div>

          <div class="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p class="text-sm text-slate-500">Judul yang jelas dan konteks yang ringkas biasanya mendapat respons lebih cepat.</p>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                @click="closeCreateModal"
              >
                Batal
              </button>
              <button
                type="button"
                :disabled="!canCreatePost"
                class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                @click="createPost"
              >
                Publikasikan topik
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
