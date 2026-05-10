<script setup>
import { ref, nextTick, computed } from 'vue'

const currentUser = 'User123'
const newMessage = ref('')
const messagesContainer = ref(null)

const groups = ref([
  { id: 1, name: 'Frontend Dev Indonesia', members: 234, unread: 3 },
  { id: 2, name: 'Job Seekers Jakarta', members: 156, unread: 0 },
  { id: 3, name: 'UX Designers', members: 89, unread: 12 },
  { id: 4, name: 'Career Transition', members: 67, unread: 0 }
])

const messages = ref({
  1: [
    { id: 1, sender: 'DevSenior', content: 'Hai semua! Ada yang mau diskusi tentang React vs Vue?', time: '10:30', isCurrentUser: false },
    { id: 2, sender: 'VueLover', content: 'Vue lebih mudah dipelajari sih menurutku', time: '10:32', isCurrentUser: false },
    { id: 3, sender: 'ReactFan', content: 'Tapi React lebih banyak job opportunities', time: '10:35', isCurrentUser: false },
    { id: 4, sender: 'User123', content: 'Kalian favoritenya apa? Aku lagi struggle milih', time: '10:40', isCurrentUser: true }
  ],
  2: [
    { id: 1, sender: 'HRManager', content: 'Lagi ada lowongan di company kami nih!', time: '09:15', isCurrentUser: false },
    { id: 2, sender: 'JobHunter', content: 'Posisi apa aja kak?', time: '09:20', isCurrentUser: false },
    { id: 3, sender: 'HRManager', content: 'Backend dev dan UI/UX designer, info lengkap di forum ya', time: '09:22', isCurrentUser: false }
  ],
  3: [
    { id: 1, sender: 'DesignLead', content: 'Baru share beberapa mockup nih, check di files ya!', time: '14:00', isCurrentUser: false },
    { id: 2, sender: 'NewDesigner', content: 'Terima kasih kak! Sangat membantu', time: '14:15', isCurrentUser: false }
  ],
  4: [
    { id: 1, sender: 'CareerCoach', content: 'Tips untuk yang mau switch career ke tech', time: '08:00', isCurrentUser: false },
    { id: 2, sender: 'Switcher', content: 'Dari mana mulai ya kak?', time: '08:05', isCurrentUser: false }
  ]
})

const selectedGroup = ref(groups.value[0] ?? null)

const currentMessages = computed(() => {
  if (!selectedGroup.value) {
    return []
  }

  return messages.value[selectedGroup.value.id] || []
})

const selectGroup = (group) => {
  selectedGroup.value = group
  group.unread = 0
}

const sendMessage = () => {
  if (newMessage.value.trim() && selectedGroup.value) {
    const message = {
      id: currentMessages.value.length + 1,
      sender: currentUser,
      content: newMessage.value,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    }
    
    if (!messages.value[selectedGroup.value.id]) {
      messages.value[selectedGroup.value.id] = []
    }
    messages.value[selectedGroup.value.id].push(message)
    newMessage.value = ''
    
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
}

const formatTime = (time) => time
</script>

<template>
  <div class="flex gap-6 h-[calc(100vh-180px)]">
    <div class="w-80 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
      <div class="p-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800">Grup Chat</h2>
        <p class="text-gray-500 text-sm">Bergabung dengan komunitas</p>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="group in groups" 
          :key="group.id"
          @click="selectGroup(group)"
          class="p-4 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50"
          :class="{ 'bg-blue-50': selectedGroup?.id === group.id }"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                {{ group.name[0] }}
              </div>
              <div>
                <h3 class="font-medium text-gray-800">{{ group.name }}</h3>
                <p class="text-sm text-gray-500">{{ group.members }} members</p>
              </div>
            </div>
            <span 
              v-if="group.unread > 0"
              class="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              {{ group.unread }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
      <div v-if="selectedGroup" class="p-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
            {{ selectedGroup.name[0] }}
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">{{ selectedGroup.name }}</h3>
            <p class="text-sm text-gray-500">{{ selectedGroup.members }} members aktif</p>
          </div>
        </div>
      </div>

      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div 
          v-for="msg in currentMessages" 
          :key="msg.id"
          class="flex"
          :class="{ 'justify-end': msg.isCurrentUser }"
        >
          <div 
            class="max-w-[70%] rounded-2xl px-4 py-3"
            :class="msg.isCurrentUser 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'"
          >
            <p class="text-sm font-medium mb-1 opacity-75">{{ msg.sender }}</p>
            <p class="mb-1">{{ msg.content }}</p>
            <p class="text-xs opacity-60">{{ formatTime(msg.time) }}</p>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-100">
        <div class="flex gap-3">
          <input 
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Ketik pesan..."
            class="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button 
            @click="sendMessage"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
