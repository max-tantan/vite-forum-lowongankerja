import { computed, reactive } from 'vue'

const ACCOUNTS_KEY = 'jobforum_accounts'
const SESSION_KEY = 'jobforum_session'

const defaultAccounts = [
  {
    id: 1,
    username: 'user',
    password: '123',
    fullName: 'User Demo',
    email: 'user@jobforum.local',
    role: 'Community Member'
  }
]

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const getStoredAccounts = () => {
  if (typeof window === 'undefined') {
    return [...defaultAccounts]
  }

  const storedValue = window.localStorage.getItem(ACCOUNTS_KEY)

  if (!storedValue) {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(defaultAccounts))
    return [...defaultAccounts]
  }

  const accounts = safeJsonParse(storedValue, [...defaultAccounts])
  const hasDemoUser = accounts.some((account) => account.username === 'user')

  if (!hasDemoUser) {
    const nextAccounts = [...accounts, ...defaultAccounts]
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts))
    return nextAccounts
  }

  return accounts
}

const sanitizeUser = (account) => {
  if (!account) {
    return null
  }

  const { password, ...safeAccount } = account
  return safeAccount
}

const loadSessionUser = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const storedValue = window.localStorage.getItem(SESSION_KEY)
  return sanitizeUser(safeJsonParse(storedValue, null))
}

const authState = reactive({
  currentUser: loadSessionUser()
})

const persistSession = (account) => {
  if (typeof window === 'undefined') {
    return
  }

  const safeAccount = sanitizeUser(account)
  authState.currentUser = safeAccount
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(safeAccount))
}

const clearSession = () => {
  if (typeof window === 'undefined') {
    return
  }

  authState.currentUser = null
  window.localStorage.removeItem(SESSION_KEY)
}

export const useAuth = () => {
  const isAuthenticated = computed(() => authState.currentUser !== null)

  const signIn = ({ identifier, password }) => {
    const accounts = getStoredAccounts()
    const normalizedIdentifier = identifier.trim().toLowerCase()

    const matchedAccount = accounts.find((account) => {
      return (
        account.username.toLowerCase() === normalizedIdentifier ||
        account.email.toLowerCase() === normalizedIdentifier
      )
    })

    if (!matchedAccount || matchedAccount.password !== password) {
      return {
        ok: false,
        message: 'Username atau password tidak sesuai. Gunakan user / 123 untuk akun demo.'
      }
    }

    persistSession(matchedAccount)

    return {
      ok: true,
      user: sanitizeUser(matchedAccount)
    }
  }

  const signOut = () => {
    clearSession()
  }

  const ensureAccounts = () => {
    getStoredAccounts()
  }

  return {
    currentUser: computed(() => authState.currentUser),
    isAuthenticated,
    ensureAccounts,
    signIn,
    signOut
  }
}
