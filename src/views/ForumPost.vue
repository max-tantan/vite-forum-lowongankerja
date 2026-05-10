<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadForumPosts, saveForumPosts } from '../data/forumData'

const route = useRoute()
const router = useRouter()
const posts = ref(loadForumPosts())
const newComment = ref('')

const currentPost = computed(() => {
  return posts.value.find((post) => post.id === Number(route.params.id)) || null
})

const commentCount = computed(() => {
  return currentPost.value?.comments.length || 0
})

const readingTime = computed(() => {
  if (!currentPost.value) {
    return 1
  }

  return Math.max(1, Math.ceil(currentPost.value.content.split(/\s+/).length / 180))
})

const relatedPosts = computed(() => {
  if (!currentPost.value) {
    return posts.value.slice(0, 3)
  }

  return posts.value
    .filter((post) => post.id !== currentPost.value.id && post.category === currentPost.value.category)
    .slice(0, 3)
})

const contentParagraphs = computed(() => {
  if (!currentPost.value) {
    return []
  }

  return currentPost.value.content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
})

const likeDiscussion = () => {
  if (!currentPost.value) {
    return
  }

  currentPost.value.likes += 1
  currentPost.value.lastActivity = 'Baru saja'
  saveForumPosts(posts.value)
}

const likeComment = (comment) => {
  comment.likes += 1
  saveForumPosts(posts.value)
}

const addComment = () => {
  if (!newComment.value.trim() || !currentPost.value) {
    return
  }

  currentPost.value.comments.push({
    id: currentPost.value.comments.length + 1,
    author: 'User123',
    role: 'Community Member',
    content: newComment.value.trim(),
    createdAt: 'Baru saja',
    likes: 0
  })

  currentPost.value.participants = Math.max(currentPost.value.participants, currentPost.value.comments.length + 1)
  currentPost.value.lastActivity = 'Baru saja'
  saveForumPosts(posts.value)
  newComment.value = ''
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
  <div v-if="currentPost" class="mx-auto max-w-6xl space-y-8">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      @click="router.push('/forum')"
    >
      Kembali ke forum
    </button>

    <section class="relative overflow-hidden rounded-[32px] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#f8fbff_100%)] px-6 py-8 shadow-[0_30px_80px_-50px_rgba(37,99,235,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div class="absolute inset-x-0 top-0 h-44 bg-gradient-to-r from-blue-100 via-sky-50 to-white"></div>
      <div class="absolute -left-16 top-10 h-40 w-40 rounded-full bg-blue-200/45 blur-3xl"></div>
      <div class="absolute right-0 top-20 h-52 w-52 rounded-full bg-sky-200/35 blur-3xl"></div>

      <div class="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(currentPost.category)">
              {{ currentPost.category }}
            </span>
            <span
              v-if="currentPost.isPinned"
              class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
            >
              Pinned
            </span>
            <span class="text-sm text-slate-400">{{ currentPost.createdAt }}</span>
          </div>

          <h1 class="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {{ currentPost.title }}
          </h1>

          <p class="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {{ currentPost.excerpt }}
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              @click="likeDiscussion"
            >
              Suka diskusi
            </button>
            <button
              type="button"
              class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              @click="router.push('/chat')"
            >
              Bahas di grup chat
            </button>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-4">
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ currentPost.likes }}</p>
              <p class="mt-1 text-sm text-slate-600">Suka</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ commentCount }}</p>
              <p class="mt-1 text-sm text-slate-600">Komentar</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ currentPost.views }}</p>
              <p class="mt-1 text-sm text-slate-600">Dilihat</p>
            </div>
            <div class="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
              <p class="text-2xl font-bold text-slate-900">{{ readingTime }} min</p>
              <p class="mt-1 text-sm text-slate-600">Estimasi baca</p>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Author thread</p>
            <div class="mt-4 flex items-center gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                {{ getInitials(currentPost.author) }}
              </div>
              <div>
                <p class="text-lg font-semibold text-slate-900">{{ currentPost.author }}</p>
                <p class="text-sm text-slate-500">{{ currentPost.authorRole }}</p>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-slate-400">Aktif terakhir</p>
                <p class="mt-1 font-semibold text-slate-900">{{ currentPost.lastActivity }}</p>
              </div>
              <div class="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-slate-400">Partisipan</p>
                <p class="mt-1 font-semibold text-slate-900">{{ currentPost.participants }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Tag topik</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in currentPost.tags"
                :key="tag"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
      <div class="space-y-6">
        <article class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-5">
            <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(currentPost.category)">
              {{ currentPost.category }}
            </span>
            <span class="text-sm text-slate-400">{{ currentPost.createdAt }}</span>
            <span class="text-sm text-slate-400">{{ currentPost.views }} pembaca</span>
          </div>

          <div class="mt-6 space-y-5">
            <p
              v-for="paragraph in contentParagraphs"
              :key="paragraph"
              class="text-base leading-8 text-slate-700"
            >
              {{ paragraph }}
            </p>
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-slate-100 bg-slate-50/80 px-5 py-4">
            <div>
              <p class="text-sm font-semibold text-slate-900">Terlibat dalam diskusi ini</p>
              <p class="mt-1 text-sm text-slate-500">Beri pendapat yang jelas, singkat, dan relevan supaya thread tetap mudah diikuti.</p>
            </div>
            <button
              type="button"
              class="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              @click="likeDiscussion"
            >
              Tambah dukungan
            </button>
          </div>
        </article>

        <section class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Komentar</p>
              <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ commentCount }} tanggapan dari komunitas</h2>
            </div>
            <p class="text-sm text-slate-500">Tanggapan yang rapi membantu topik tetap mudah diikuti.</p>
          </div>

          <div class="mt-6 rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Tambahkan komentar</span>
              <textarea
                v-model="newComment"
                rows="4"
                placeholder="Tulis pendapat, pengalaman, atau saran yang bisa membantu diskusi ini..."
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 resize-none"
              ></textarea>
            </label>
            <div class="mt-4 flex justify-end">
              <button
                type="button"
                class="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                @click="addComment"
              >
                Kirim komentar
              </button>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <article
              v-for="comment in currentPost.comments"
              :key="comment.id"
              class="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div class="flex gap-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                  {{ getInitials(comment.author) }}
                </div>
                <div class="flex-1">
                  <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p class="font-semibold text-slate-900">{{ comment.author }}</p>
                      <p class="text-sm text-slate-500">{{ comment.role }}</p>
                    </div>
                    <p class="text-sm text-slate-400">{{ comment.createdAt }}</p>
                  </div>

                  <p class="mt-3 text-sm leading-7 text-slate-600">{{ comment.content }}</p>

                  <div class="mt-4 flex items-center gap-4">
                    <button
                      type="button"
                      class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                      @click="likeComment(comment)"
                    >
                      Suka
                    </button>
                    <span class="text-sm text-slate-400">{{ comment.likes }} dukungan</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      <aside class="space-y-5">
        <div class="rounded-[28px] border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Ringkasan thread</p>
          <div class="mt-4 space-y-4">
            <div class="rounded-2xl border border-blue-100 bg-white p-4">
              <p class="text-sm text-slate-500">Like diskusi</p>
              <p class="mt-1 text-2xl font-bold text-slate-900">{{ currentPost.likes }}</p>
            </div>
            <div class="rounded-2xl border border-blue-100 bg-white p-4">
              <p class="text-sm text-slate-500">Komentar masuk</p>
              <p class="mt-1 text-2xl font-bold text-slate-900">{{ commentCount }}</p>
            </div>
            <div class="rounded-2xl border border-blue-100 bg-white p-4">
              <p class="text-sm text-slate-500">Aktivitas terakhir</p>
              <p class="mt-1 text-2xl font-bold text-slate-900">{{ currentPost.lastActivity }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Topik terkait</p>
          <div class="mt-4 space-y-4">
            <RouterLink
              v-for="post in relatedPosts"
              :key="post.id"
              :to="`/forum/${post.id}`"
              class="block rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-slate-200 hover:bg-white"
            >
              <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="getCategoryClasses(post.category)">
                {{ post.category }}
              </span>
              <h3 class="mt-3 text-base font-semibold text-slate-900">{{ post.title }}</h3>
              <p class="mt-1 text-sm leading-6 text-slate-600">{{ post.excerpt }}</p>
            </RouterLink>
          </div>
        </div>
      </aside>
    </section>
  </div>

  <div v-else class="mx-auto max-w-3xl rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
    <h1 class="text-2xl font-bold text-slate-900">Topik tidak ditemukan</h1>
    <p class="mt-3 text-sm leading-6 text-slate-600">
      Thread yang kamu buka belum tersedia atau mungkin sudah berubah. Kembali ke forum untuk memilih diskusi lain.
    </p>
    <button
      type="button"
      class="mt-6 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      @click="router.push('/forum')"
    >
      Kembali ke forum
    </button>
  </div>
</template>
