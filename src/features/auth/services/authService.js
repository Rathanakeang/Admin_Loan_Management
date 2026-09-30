import { apiClient, getResource, unwrapAuth } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'
import { storage } from '@/services/storage/localStorage'

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(endpoints.auth.login, credentials)
    const { token, user } = unwrapAuth(response.data)
    if (!token) {
      throw new Error('Login response did not include an access token')
    }
    storage.setToken(token)
    const profile = user || (await this.me())
    storage.setUser(profile)
    return profile
  },

  async me() {
    const profile = await getResource(endpoints.auth.me)
    return profile?.user || profile
  },

  async logout() {
    try {
      await apiClient.post(endpoints.auth.logout)
    } catch {
      // Clear the local session even if the server session is already gone.
    }
  },

  forgotPassword(email) {
    return apiClient.post(endpoints.auth.forgotPassword, { email }).then((response) => response.data)
  },

  resetPassword(payload) {
    return apiClient.post(endpoints.auth.resetPassword, payload).then((response) => response.data)
  },
}
