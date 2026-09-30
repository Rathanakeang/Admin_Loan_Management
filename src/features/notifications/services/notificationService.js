import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const notificationService = {
  list(params) {
    return getCollection(endpoints.notifications.collection, params)
  },
  async unreadCount() {
    const data = await getResource(endpoints.notifications.unreadCount)
    const count = data?.count ?? data?.unread ?? 0
    return { count: Number(count) || 0 }
  },
  markRead(id) {
    return writeResource('post', endpoints.notifications.read(id))
  },
}
