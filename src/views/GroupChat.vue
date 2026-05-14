<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { getInitials } from '../composables/useHelpers'

const currentUser = 'User123'
const groupSearch = ref('')
const messagesContainer = ref(null)

const groups = ref([
  {
    id: 1,
    name: 'Frontend Dev Indonesia',
    members: 234,
    online: 48,
    unread: 3,
    topic: 'React, Vue, design system, dan sharing lowongan frontend.'
  },
  {
    id: 2,
    name: 'Job Seekers Jakarta',
    members: 156,
    online: 29,
    unread: 0,
    topic: 'Tukar info recruiter, update lowongan, dan progres interview.'
  },
  {
    id: 3,
    name: 'UX Designers',
    members: 89,
    online: 17,
    unread: 12,
    topic: 'Diskusi portfolio, review flow, dan peluang kerja untuk designer.'
  },
  {
    id: 4,
    name: 'Career Transition',
    members: 67,
    online: 14,
    unread: 0,
    topic: 'Komunitas untuk yang sedang pindah jalur karier ke dunia tech.'
  }
])

const messages = ref({
  1: [
    { id: 1, sender: 'DevSenior', content: 'Hai semua! Ada yang mau diskusi tentang React vs Vue?', time: '10:30', isCurrentUser: false },
    { id: 2, sender: 'VueLover', content: 'Vue lebih mudah dipelajari sih menurutku, terutama kalau baru pindah dari template biasa.', time: '10:32', isCurrentUser: false },
    { id: 3, sender: 'ReactFan', content: 'Tapi React masih lebih banyak peluang kerja di beberapa startup yang aku lihat minggu ini.', time: '10:35', isCurrentUser: false },
    { id: 4, sender: 'User123', content: 'Kalian favoritenya apa? Aku lagi struggle milih stack buat fokus belajar 3 bulan ke depan.', time: '10:40', isCurrentUser: true }
  ],
  2: [
    { id: 1, sender: 'HRManager', content: 'Lagi ada lowongan di company kami nih untuk backend dan UI/UX.', time: '09:15', isCurrentUser: false },
    { id: 2, sender: 'JobHunter', content: 'Posisi apa aja kak? Kalau ada link detail boleh share juga.', time: '09:20', isCurrentUser: false },
    { id: 3, sender: 'HRManager', content: 'Backend dev dan UI/UX designer, info lengkapnya sudah aku rangkum di forum ya.', time: '09:22', isCurrentUser: false }
  ],
  3: [
    { id: 1, sender: 'DesignLead', content: 'Baru share beberapa mockup onboarding nih, check di files ya kalau sempat.', time: '14:00', isCurrentUser: false },
    { id: 2, sender: 'NewDesigner', content: 'Terima kasih kak. Struktur flow dan spacing-nya jelas banget, sangat membantu.', time: '14:15', isCurrentUser: false }
  ],
  4: [
    { id: 1, sender: 'CareerCoach', content: 'Kalau mau switch career ke tech, prioritaskan project yang bisa kamu ceritakan dengan runtut.', time: '08:00', isCurrentUser: false },
    { id: 2, sender: 'Switcher', content: 'Dari mana mulai ya kak? Masih bingung mau fokus ke frontend atau data.', time: '08:05', isCurrentUser: false }
  ]
})

const drafts = ref({
  1: '',
  2: '',
  3: '',
  4: ''
})

const selectedGroup = ref(groups.value[0] ?? null)

const filteredGroups = computed(() => {
  const query = groupSearch.value.trim().toLowerCase()

  return groups.value.filter((group) => {
    if (!query) {
      return true
    }

    const searchableText = [
      group.name,
      group.topic,
      getGroupPreview(group.id)
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(query)
  })
})

const currentMessages = computed(() => {
  if (!selectedGroup.value) {
    return []
  }

  return messages.value[selectedGroup.value.id] || []
})

const currentDraft = computed({
  get() {
    if (!selectedGroup.value) {
      return ''
    }

    return drafts.value[selectedGroup.value.id] || ''
  },
  set(value) {
    if (!selectedGroup.value) {
      return
    }

    drafts.value[selectedGroup.value.id] = value
  }
})

const activeGroupMeta = computed(() => {
  if (!selectedGroup.value) {
    return null
  }

  return {
    ...selectedGroup.value,
    preview: getGroupPreview(selectedGroup.value.id),
    lastTime: getGroupTime(selectedGroup.value.id)
  }
})

function getGroupMessages(groupId) {
  return messages.value[groupId] || []
}

function getGroupPreview(groupId) {
  const groupMessages = getGroupMessages(groupId)
  const lastMessage = groupMessages[groupMessages.length - 1]

  return lastMessage?.content || 'Belum ada pesan.'
}

function getGroupTime(groupId) {
  const groupMessages = getGroupMessages(groupId)
  const lastMessage = groupMessages[groupMessages.length - 1]

  return lastMessage?.time || '--:--'
}



function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function selectGroup(group) {
  selectedGroup.value = group
  group.unread = 0
  scrollToBottom()
}

function sendMessage() {
  const content = currentDraft.value.trim()

  if (!content || !selectedGroup.value) {
    return
  }

  const message = {
    id: currentMessages.value.length + 1,
    sender: currentUser,
    content,
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    isCurrentUser: true
  }

  if (!messages.value[selectedGroup.value.id]) {
    messages.value[selectedGroup.value.id] = []
  }

  messages.value[selectedGroup.value.id].push(message)
  drafts.value[selectedGroup.value.id] = ''
  scrollToBottom()
}

function handleComposerKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_55px_-45px_rgba(15,23,42,0.35)]">
    <div class="grid min-h-[calc(100vh-12rem)] lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside class="border-b border-slate-200 bg-slate-50/80 lg:border-b-0 lg:border-r">
        <div class="border-b border-slate-200 px-5 py-5">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Group chat</p>
          <h1 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Fokus ke percakapan</h1>
          <p class="mt-2 text-sm leading-6 text-slate-500">
            Pilih grup, baca konteks cepat, lalu langsung balas tanpa distraksi visual yang berlebihan.
          </p>

          <label class="mt-4 block">
            <span class="sr-only">Cari grup</span>
            <input
              v-model="groupSearch"
              type="text"
              placeholder="Cari grup atau topik"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        <div class="max-h-[340px] overflow-y-auto lg:max-h-[calc(100vh-16rem)]">
          <button
            v-for="group in filteredGroups"
            :key="group.id"
            type="button"
            class="flex w-full items-start gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-white"
            :class="selectedGroup?.id === group.id ? 'bg-white' : 'bg-transparent'"
            @click="selectGroup(group)"
          >
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
              {{ getInitials(group.name) }}
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="truncate font-semibold text-slate-900">{{ group.name }}</p>
                  <p class="mt-1 truncate text-xs text-slate-500">{{ group.online }} online · {{ group.members }} anggota</p>
                </div>
                <div class="shrink-0 text-right">
                  <p class="text-xs text-slate-400">{{ getGroupTime(group.id) }}</p>
                  <span
                    v-if="group.unread > 0"
                    class="mt-2 inline-flex min-w-6 items-center justify-center rounded-full bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white"
                  >
                    {{ group.unread }}
                  </span>
                </div>
              </div>

              <p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                {{ getGroupPreview(group.id) }}
              </p>
            </div>
          </button>

          <div v-if="filteredGroups.length === 0" class="px-5 py-10 text-center">
            <p class="font-semibold text-slate-900">Grup tidak ditemukan</p>
            <p class="mt-2 text-sm leading-6 text-slate-500">Coba kata kunci lain agar daftar percakapannya muncul lagi.</p>
          </div>
        </div>
      </aside>

      <div class="flex min-h-[calc(100vh-12rem)] flex-col">
        <header
          v-if="activeGroupMeta"
          class="border-b border-slate-200 bg-white px-5 py-4 sm:px-6"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                  {{ getInitials(activeGroupMeta.name) }}
                </div>
                <div class="min-w-0">
                  <h2 class="truncate text-xl font-semibold tracking-tight text-slate-900">
                    {{ activeGroupMeta.name }}
                  </h2>
                  <p class="truncate text-sm text-slate-500">
                    {{ activeGroupMeta.online }} online · {{ activeGroupMeta.members }} anggota
                  </p>
                </div>
              </div>

              <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                {{ activeGroupMeta.topic }}
              </p>
            </div>

            <div class="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <p class="font-semibold text-slate-900">Aktivitas terbaru</p>
              <p class="mt-1 line-clamp-2 max-w-[280px]">{{ activeGroupMeta.preview }}</p>
            </div>
          </div>
        </header>

        <div
          ref="messagesContainer"
          class="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 sm:px-6"
        >
          <div class="flex justify-center">
            <span class="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Hari ini
            </span>
          </div>

          <div
            v-for="msg in currentMessages"
            :key="msg.id"
            class="flex"
            :class="msg.isCurrentUser ? 'justify-end' : 'justify-start'"
          >
            <div class="flex max-w-[85%] gap-3 sm:max-w-[72%]" :class="msg.isCurrentUser ? 'flex-row-reverse' : ''">
              <div
                v-if="!msg.isCurrentUser"
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xs font-bold text-white"
              >
                {{ getInitials(msg.sender) }}
              </div>

              <div
                class="rounded-[22px] px-4 py-3 shadow-sm"
                :class="
                  msg.isCurrentUser
                    ? 'rounded-br-md bg-blue-600 text-white'
                    : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                "
              >
                <p v-if="!msg.isCurrentUser" class="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {{ msg.sender }}
                </p>
                <p class="text-sm leading-7">{{ msg.content }}</p>
                <p
                  class="mt-2 text-xs"
                  :class="msg.isCurrentUser ? 'text-blue-100' : 'text-slate-400'"
                >
                  {{ msg.time }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer class="border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div class="rounded-[26px] border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label class="block min-w-0 flex-1">
                <span class="sr-only">Tulis pesan</span>
                <textarea
                  v-model="currentDraft"
                  rows="1"
                  placeholder="Tulis pesan, tekan Enter untuk kirim dan Shift + Enter untuk baris baru"
                  class="min-h-[54px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  @keydown="handleComposerKeydown"
                ></textarea>
              </label>

              <button
                type="button"
                class="inline-flex h-[54px] items-center justify-center rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
                @click="sendMessage"
              >
                Kirim pesan
              </button>
            </div>

            <div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <p>Draft pesan akan tetap tersimpan saat kamu pindah grup.</p>
              <p>{{ currentMessages.length }} pesan di percakapan ini</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>
