import { apiClient, getCollection, getResource, unwrapData } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const messageService = {
  conversations(params) {
    return getCollection(endpoints.messages.conversations, params)
  },
  thread(userId) {
    return getResource(endpoints.messages.thread(userId))
  },
  async send(userId, { text, file }) {
    if (file) {
      const formData = new FormData()
      if (text) formData.append('text', text)
      formData.append('file', file)
      const response = await apiClient.post(endpoints.messages.send(userId), formData)
      return unwrapData(response.data)
    }
    const response = await apiClient.post(endpoints.messages.send(userId), { text })
    return unwrapData(response.data)
  },
  remove(userId, messageId) {
    return apiClient.delete(endpoints.messages.remove(userId, messageId))
  },
}
