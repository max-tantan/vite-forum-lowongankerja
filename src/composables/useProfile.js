const PROFILE_PREFIX = 'jobforum_profile_'

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const buildDefaultProfile = (user) => {
  return {
    username: user?.username || 'user',
    fullName: user?.fullName || 'User Demo',
    headline: 'Aktif mencari peluang kerja dan membangun profil yang siap dilihat recruiter.',
    location: 'Jakarta, Indonesia',
    availability: 'Siap interview dalam 1 minggu',
    targetRole: 'Frontend Developer',
    phone: '08xxxxxxxxxx',
    portfolioUrl: '',
    linkedinUrl: '',
    about:
      'Profil ini tersimpan lokal di browser. Kamu bisa upload banner dan CV PDF untuk simulasi profil kandidat yang lebih realistis.',
    skills: ['Vue.js', 'UI Thinking', 'Interview Prep'],
    bannerImage: null,
    cvFile: null,
    updatedAt: null
  }
}

const normalizeProfile = (user, profile) => {
  const fallback = buildDefaultProfile(user)

  return {
    ...fallback,
    ...profile,
    username: user?.username || fallback.username,
    fullName: user?.fullName || fallback.fullName,
    skills: Array.isArray(profile?.skills) && profile.skills.length > 0 ? profile.skills : fallback.skills
  }
}

const getProfileKey = (username) => `${PROFILE_PREFIX}${username}`

export const loadStoredProfile = (user) => {
  if (typeof window === 'undefined' || !user?.username) {
    return buildDefaultProfile(user)
  }

  const storedValue = window.localStorage.getItem(getProfileKey(user.username))
  const parsedValue = safeJsonParse(storedValue, null)

  return normalizeProfile(user, parsedValue)
}

export const saveStoredProfile = (user, profile) => {
  if (typeof window === 'undefined' || !user?.username) {
    return { ok: false, message: 'Profil belum bisa disimpan.' }
  }

  const nextProfile = normalizeProfile(user, {
    ...profile,
    updatedAt: new Date().toISOString()
  })

  try {
    window.localStorage.setItem(getProfileKey(user.username), JSON.stringify(nextProfile))

    return {
      ok: true,
      profile: nextProfile
    }
  } catch {
    return {
      ok: false,
      message: 'Penyimpanan lokal penuh. Coba gunakan file yang lebih kecil.'
    }
  }
}

export const clearStoredProfileAssets = (user) => {
  if (typeof window === 'undefined' || !user?.username) {
    return
  }

  window.localStorage.removeItem(getProfileKey(user.username))
}
