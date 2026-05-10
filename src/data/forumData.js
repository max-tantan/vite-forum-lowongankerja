export const forumCategories = ['Semua', 'Teknologi', 'Karir', 'TipsInterview', 'Diskusi']

const storageKey = 'jobforum_forum_posts'

const createExcerpt = (content) => {
  return content.length > 150 ? `${content.slice(0, 147)}...` : content
}

const initialForumPosts = [
  {
    id: 1,
    title: 'Tips mendapatkan kerja di perusahaan startup?',
    content:
      'Hai semuanya! Saya mau tanya nih, ada yang punya tips untuk bisa diterima di perusahaan startup? Terutama yang berkaitan dengan interview dan portfolio. Saya fresh graduate dan belum punya pengalaman kerja sama sekali. Terima kasih!',
    excerpt:
      'Minta saran untuk meningkatkan peluang diterima di startup, khususnya di tahap interview dan penyusunan portfolio.',
    author: 'DevJunior',
    authorRole: 'Fresh Graduate',
    category: 'TipsInterview',
    createdAt: '2 jam lalu',
    lastActivity: '10 menit lalu',
    likes: 24,
    views: 186,
    participants: 18,
    isPinned: true,
    tags: ['Interview', 'Portfolio', 'Startup'],
    comments: [
      {
        id: 1,
        author: 'SeniorDev',
        role: 'Software Engineer',
        content:
          'Fokus ke portfolio yang benar-benar menunjukkan proses berpikir kamu. Satu studi kasus yang rapi biasanya lebih kuat daripada banyak project setengah jadi.',
        createdAt: '1 jam lalu',
        likes: 8
      },
      {
        id: 2,
        author: 'TechLead',
        role: 'Engineering Lead',
        content:
          'Selain portfolio, coba latih cerita tentang kontribusi kamu. Startup biasanya suka kandidat yang bisa menjelaskan dampak dari pekerjaannya dengan jelas.',
        createdAt: '38 menit lalu',
        likes: 12
      }
    ]
  },
  {
    id: 2,
    title: 'Review: Bootcamp programming vs Kuliah CS?',
    content:
      'Mau tanya pendapat teman-teman. Lebih worth it mana belajar programming lewat bootcamp atau kuliah CS? Saya bingung mau mulai dari mana. Budget terbatas tapi mau dapat pengetahuan yang solid.',
    excerpt:
      'Diskusi tentang jalur belajar yang paling realistis antara bootcamp dan kuliah CS untuk yang baru mulai.',
    author: 'CodeNewbie',
    authorRole: 'Career Switcher',
    category: 'Karir',
    createdAt: '5 jam lalu',
    lastActivity: '25 menit lalu',
    likes: 45,
    views: 241,
    participants: 27,
    isPinned: false,
    tags: ['Bootcamp', 'Kuliah', 'Learning Path'],
    comments: [
      {
        id: 1,
        author: 'ProductBuilder',
        role: 'Frontend Engineer',
        content:
          'Kalau targetmu cepat kerja, bootcamp bisa lebih cepat. Tapi kamu tetap perlu belajar fundamental sendiri supaya pondasinya kuat.',
        createdAt: '2 jam lalu',
        likes: 7
      },
      {
        id: 2,
        author: 'CampusMentor',
        role: 'Lecturer',
        content:
          'Kuliah CS cocok kalau kamu ingin eksplorasi teori lebih dalam dan punya waktu lebih panjang untuk membangun dasar yang lengkap.',
        createdAt: '1 jam lalu',
        likes: 9
      }
    ]
  },
  {
    id: 3,
    title: 'Struktur data mana yang paling penting untuk interview?',
    content:
      'Lagi persiapin interview untuk posisi backend developer. Bagian mana sih yang paling sering ditanya? Array, tree, graph? Mohon sarannya!',
    excerpt:
      'Mencari prioritas belajar struktur data yang paling sering muncul saat interview backend developer.',
    author: 'BackendDev',
    authorRole: 'Backend Engineer',
    category: 'Teknologi',
    createdAt: '1 hari lalu',
    lastActivity: '1 jam lalu',
    likes: 67,
    views: 328,
    participants: 34,
    isPinned: true,
    tags: ['Data Structure', 'Backend', 'Interview'],
    comments: [
      {
        id: 1,
        author: 'SeniorDev',
        role: 'Software Engineer',
        content:
          'Kalau backend, array, hashmap, tree traversal, dan graph traversal itu paling sering. Mulai dari yang sering dipakai dulu, lalu naik ke problem yang lebih kompleks.',
        createdAt: '6 jam lalu',
        likes: 11
      },
      {
        id: 2,
        author: 'HiringManager',
        role: 'Engineering Manager',
        content:
          'Selain hafal konsepnya, yang penting kamu bisa menjelaskan trade-off dan kapan struktur data tertentu lebih cocok dipakai.',
        createdAt: '4 jam lalu',
        likes: 10
      }
    ]
  },
  {
    id: 4,
    title: 'Perbedaan Remote vs Hybrid work',
    content:
      'Yang sudah berpengalaman, menurut kalian lebih prefer kerja remote atau hybrid? Apa keuntungan dan kekurangan masing-masing? Terutama untuk fresh graduate, mana yang lebih recommended?',
    excerpt:
      'Membandingkan pola kerja remote dan hybrid, terutama dari sudut pandang pembelajaran dan kolaborasi untuk pemula.',
    author: 'WFHWarrior',
    authorRole: 'Remote Worker',
    category: 'Diskusi',
    createdAt: '2 hari lalu',
    lastActivity: '2 jam lalu',
    likes: 89,
    views: 410,
    participants: 44,
    isPinned: false,
    tags: ['Remote', 'Hybrid', 'Work Style'],
    comments: [
      {
        id: 1,
        author: 'PeopleOps',
        role: 'HR Manager',
        content:
          'Untuk fresh graduate, hybrid sering lebih aman karena masih ada ruang untuk belajar langsung dari tim sambil tetap fleksibel.',
        createdAt: '1 hari lalu',
        likes: 14
      },
      {
        id: 2,
        author: 'RemoteLead',
        role: 'Team Lead',
        content:
          'Remote bagus kalau sistem timnya matang. Kalau onboarding masih lemah, hybrid bisa terasa lebih nyaman untuk awal karier.',
        createdAt: '17 jam lalu',
        likes: 13
      }
    ]
  },
  {
    id: 5,
    title: 'Cara negosiasi gaji saat offer letter?',
    content:
      'Baru dapat offer letter dari perusahaan, tapi salary-nya masih di bawah ekspektasi. Gimana ya cara negosiasi yang baik? Ada yang bisa sharing pengalaman?',
    excerpt:
      'Minta panduan untuk negosiasi offer letter dengan cara yang sopan, jelas, dan tetap profesional.',
    author: 'Negotiator',
    authorRole: 'Mid-level Candidate',
    category: 'TipsInterview',
    createdAt: '3 hari lalu',
    lastActivity: '30 menit lalu',
    likes: 112,
    views: 522,
    participants: 51,
    isPinned: false,
    tags: ['Salary', 'Offer Letter', 'Negotiation'],
    comments: [
      {
        id: 1,
        author: 'CareerCoach',
        role: 'Career Mentor',
        content:
          'Masuklah dengan data. Sebutkan angka target yang realistis, alasan bisnisnya, dan nilai yang bisa kamu bawa ke tim.',
        createdAt: '2 hari lalu',
        likes: 19
      },
      {
        id: 2,
        author: 'RecruiterID',
        role: 'Recruiter',
        content:
          'Nada komunikasinya penting. Hindari kesan memaksa, tapi tetap tegas tentang ekspektasi dan pertimbanganmu.',
        createdAt: '1 hari lalu',
        likes: 16
      }
    ]
  }
]

const clonePosts = (posts) => JSON.parse(JSON.stringify(posts))

const normalizePost = (post) => {
  const comments = Array.isArray(post.comments) ? post.comments : []

  return {
    ...post,
    excerpt: post.excerpt || createExcerpt(post.content || ''),
    authorRole: post.authorRole || 'Member',
    lastActivity: post.lastActivity || post.createdAt || 'Baru saja',
    views: post.views ?? 0,
    participants: post.participants ?? Math.max(1, comments.length + 1),
    isPinned: Boolean(post.isPinned),
    tags: Array.isArray(post.tags) ? post.tags : [],
    comments: comments.map((comment, index) => ({
      id: comment.id ?? index + 1,
      author: comment.author || 'Member',
      role: comment.role || 'Member',
      content: comment.content || '',
      createdAt: comment.createdAt || 'Baru saja',
      likes: comment.likes ?? 0
    }))
  }
}

export const createDefaultForumPosts = () => {
  return clonePosts(initialForumPosts).map(normalizePost)
}

export const loadForumPosts = () => {
  if (typeof window === 'undefined') {
    return createDefaultForumPosts()
  }

  try {
    const storedPosts = window.localStorage.getItem(storageKey)

    if (!storedPosts) {
      return createDefaultForumPosts()
    }

    return JSON.parse(storedPosts).map(normalizePost)
  } catch {
    return createDefaultForumPosts()
  }
}

export const saveForumPosts = (posts) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(posts.map(normalizePost)))
}
