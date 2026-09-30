const TOKEN_KEY = 'lms.accessToken'
const USER_KEY = 'lms.user'

function readJson(key) {
  const raw = window.localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    window.localStorage.removeItem(key)
    return null
  }
}

export const storage = {
  getToken() {
    return window.localStorage.getItem(TOKEN_KEY)
  },

  setToken(token) {
    if (token) window.localStorage.setItem(TOKEN_KEY, token)
  },

  getUser() {
    return readJson(USER_KEY)
  },

  setUser(user) {
    if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  setSession(token, user) {
    this.setToken(token)
    this.setUser(user)
  },

  clearSession() {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
  },
}
