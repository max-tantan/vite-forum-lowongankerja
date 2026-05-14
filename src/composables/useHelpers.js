/**
 * Shared helper functions used across multiple views.
 *
 * Centralised here to avoid duplicating the same colour-mapping and
 * formatting logic in Home, Forum, ForumPost, JobDetail, and GroupChat.
 */

/**
 * Returns Tailwind badge classes for a given category string.
 * Covers both job categories (Teknologi, Desain, Marketing, Keuangan)
 * and forum categories (Karir, TipsInterview, Diskusi).
 */
export const getCategoryClasses = (category) => {
  const tones = {
    Teknologi: 'border-blue-100 bg-blue-50 text-blue-700',
    Desain: 'border-amber-100 bg-amber-50 text-amber-700',
    Marketing: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    Keuangan: 'border-slate-200 bg-slate-100 text-slate-700',
    Karir: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    TipsInterview: 'border-amber-100 bg-amber-50 text-amber-700',
    Diskusi: 'border-violet-100 bg-violet-50 text-violet-700'
  }

  return tones[category] || 'border-slate-200 bg-slate-100 text-slate-700'
}

/**
 * Returns Tailwind badge classes for work-mode labels
 * (Remote, Hybrid, On-site).
 */
export const getModeClasses = (mode) => {
  const tones = {
    Remote: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    Hybrid: 'border-sky-100 bg-sky-50 text-sky-700',
    'On-site': 'border-orange-100 bg-orange-50 text-orange-700'
  }

  return tones[mode] || 'border-slate-200 bg-slate-100 text-slate-700'
}

/**
 * Returns Tailwind badge classes for job type labels
 * (Full-time, Part-time).
 */
export const getTypeClasses = (type) => {
  const tones = {
    'Full-time': 'border-slate-900 bg-slate-900 text-white',
    'Part-time': 'border-slate-200 bg-white text-slate-700'
  }

  return tones[type] || 'border-slate-200 bg-white text-slate-700'
}

/**
 * Returns Tailwind classes for a category filter button.
 *
 * @param {string} selected  The currently active category value.
 * @param {string} category  The category this button represents.
 */
export const getCategoryButtonClasses = (selected, category) => {
  if (selected === category) {
    return 'border-blue-600 bg-blue-600 text-white shadow-sm'
  }

  return 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
}

/**
 * Extracts up to two uppercase initials from a display name.
 *
 * @param {string} name  e.g. "Dev Senior" → "DS"
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
