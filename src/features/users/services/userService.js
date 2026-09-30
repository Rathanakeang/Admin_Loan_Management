import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const userService = {
  list(params) {
    return getCollection(endpoints.users.collection, params)
  },
  getById(id) {
    return getResource(endpoints.users.detail(id))
  },
  create(payload) {
    return writeResource('post', endpoints.users.collection, payload)
  },
  update(id, payload) {
    return writeResource('put', endpoints.users.detail(id), payload)
  },
}
